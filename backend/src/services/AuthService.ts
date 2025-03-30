import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../config/db";
import { validationResult, check } from "express-validator";
import User from "../models/User";
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";
import { validateUser } from "../validation/userValidation";

class AuthService {
  private static instance: AuthService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }
  register = async (req: any, res: any, next: NextFunction) => {
    const {
      name,
      email,
      password,
      repeatPassword,
      dateOfBirth,
      surname,
      nickname,
      phone,
      isAdmin,
    } = req.body;

    try {
      await User.create({
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        password_hash: await bcrypt.hash(password, 10),
        nickname: nickname,
        is_admin: true,
        date_of_birth: dateOfBirth,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return { message: "User created successfully." };
    } catch (err) {
      const errors = validateUser(req, res, next);
      if (errors!) {
        return errors;
      }
    }
  };

  login = async (
    req: any,
    res: any,
    next: NextFunction
  ): Promise<
    | {
        user: Omit<User, "password_hash">;
        accessToken: string;
        refreshToken: string;
      }
    | any[]
    | undefined
  > => {
    const { email, password } = req.body;
    const errors = [];
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        const error = new HttpException(
          404,
          "User with this email does not exist. Please try again.",
          { email: true, password: true, repeatPassword: true }
        );
        next(error);
      } else {
        const validPassword = await bcrypt.compare(
          password,
          user.password_hash
        );
        if (!validPassword) {
          const error = new HttpException(
            404,
            "Password is incorrect. Please try again.",
            { email: false, password: true, repeatPassword: true }
          );
          next(error);
        }

        if (validPassword) {
          const { password_hash, ...userWithoutPassword } = user!.get({
            plain: true,
          });
          const accessToken = this.generateToken(userWithoutPassword);
          const refreshToken = this.generateRefreshToken(userWithoutPassword);
          res.cookie("accessToken", accessToken, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            sameSite: "None",
            secure: true,
            maxAge: 3 * 60 * 1000, // Cookie expiration time in milliseconds (3 minutes)
          });
          res.cookie("refreshAccessToken", refreshToken, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            sameSite: "None",
            secure: true,
            maxAge: 3 * 60 * 1000 * 20 * 72, // Cookie expiration time in milliseconds (3 minutes)
          });

          return { user: userWithoutPassword, accessToken, refreshToken };
        }
      }

      // if (errors.length > 0) {
      //   return errors;
      // }
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req: any, res: any, next: NextFunction) => {
    const refreshToken = req.cookies.refreshAccessToken;
    if (!refreshToken) {
      const error = new HttpException(
        422,
        "Do not have refresh token. Please login again."
      );
      next(error);
    }

    const secretRefresh = process.env.JWT_SECRET_REFRESH;

    jwt.verify(refreshToken, secretRefresh!, (err: any, user: any) => {
      if (err) {
        next(err);
      }

      const secret = process.env.JWT_SECRET;

      const accessToken = jwt.sign(
        { userId: user.userId, email: user.email },
        secret!
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 3 * 60 * 1000, // 3 minutes
      });

      return { accessToken }; // Send the new access token as a response
    });
  };

  generateToken = (user: any) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        isAdmin: user.is_admin,
      },
      secret!
    );
  };

  generateRefreshToken = (user: any) => {
    const secret = process.env.JWT_SECRET_REFRESH;
    return jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
      },
      secret!
    );
  };
}

export default AuthService;
