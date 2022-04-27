import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express, {NextFunction, Request, Response} from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import {env} from './constant/env'
import {ERROR_MESSAGE} from './constant/error'
import {HTTP_STATUS} from './constant/httpStatus'
import {api} from './route'

const main = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URI}`)

    const app = express()

    app.use(morgan('dev'))

    app.use(express.json())
    app.use(cors())

    app.use('/api', api)

    app.use('*', (req, res, next) => {
      const error = {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGE.API_ENDPOINT_NOT_FOUND,
      }
      next(error)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
      const message = err.message || ERROR_MESSAGE.SERVER_ERROR
      const data = err.data || null

      res.status(status).json({
        type: 'error',
        message,
        data,
      })
    })

    app.listen(parseInt(`${env.PORT}`), () =>
      console.log(`Server is listening on port ${env.PORT}`),
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
