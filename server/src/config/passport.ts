// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
// import passport from 'passport';
// import dotenv from 'dotenv';
// import {User} from '../models/User';

// dotenv.config();

// const opts: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET as string, 
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
//     try {
//       const user = await User.findById(jwt_payload.id);
//       if (user) {
//         return done(null, user);
//       }
//       return done(null, false);
//     } catch (error) {
//       return done(error, false);
//     }
//   })
// );

// export default passport;