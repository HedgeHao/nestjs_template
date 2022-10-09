import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Config } from '../../config'
import { _Template } from './entity/template.entity'

export const connection = {
  default: 'default',
  readonly: process.env.MODE === 'test' ? 'default' : 'readonly',
} as const

export const modelList = []
const entityList = [_Template]

export function getSQLiteOptions(): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: Config.TEST_DATABASE,
    synchronize: Config.TEST_DATABASE === ':memory:',
    logging: process.argv.includes('--sql-log') ? true : ['error'],
    autoLoadEntities: true,
  }
}

export function getMySQLOptions(host: string): TypeOrmModuleOptions {
  return {
    host,
    type: 'mysql',
    port: Config.MYSQL_PORT,
    username: Config.MYSQL_USERNAME,
    password: Config.MYSQL_PASSWORD,
    database: Config.MYSQL_DATABASE,
    logging: process.argv.includes('--sql-log') ? true : ['error'],
    // cache: {
    //   type: 'ioredis',
    //   options: {
    //     host: Config.REDIS_HOST,
    //     password: Config.REDIS_PASSWORD,
    //     port: Config.REDIS_PORT,
    //   },
    //   duration: 5000,
    // },
    extra: {
      connectionLimit: 100,
      charset: 'utf8mb4_unicode_ci',
    },
    autoLoadEntities: true,
    keepConnectionAlive: true,
    bigNumberStrings: false,
    synchronize: false,
  }
}

export const ConnectionModule =
  Config.MODE === 'test'
    ? [
        TypeOrmModule.forRootAsync({
          name: connection.default,
          useFactory: getSQLiteOptions,
        }),
      ]
    : [
        TypeOrmModule.forRootAsync({
          name: connection.default,
          useFactory: getMySQLOptions.bind(undefined, Config.MYSQL_HOST),
        }),
        TypeOrmModule.forRootAsync({
          name: connection.readonly,
          useFactory: getMySQLOptions.bind(
            undefined,
            Config.MYSQL_REPLICA_HOST,
          ),
        }),
      ]

export const RepositoryModule = [
  TypeOrmModule.forFeature(entityList, connection.default),
  TypeOrmModule.forFeature(entityList, connection.readonly),
]
