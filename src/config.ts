import { plainToClass, Transform } from 'class-transformer'
import { IsNumber, IsString, validateSync } from 'class-validator'
import { config } from 'dotenv'
import { join } from 'path'

config({
  path:
    process.env.MODE === 'dev'
      ? join(
          __dirname,
          `${__dirname.includes('dist') ? '..' : ''}/env/.env.dev`,
        )
      : `/etc/config/.env.${process.env.MODE}`,
})

const validate_modes = ['dev']

class EnvVariable {
  @IsString()
  readonly MODE!: string

  @IsString({ groups: validate_modes })
  readonly MYSQL_DATABASE!: string

  @IsString({ groups: validate_modes })
  readonly MYSQL_HOST!: string

  @IsString({ groups: validate_modes })
  readonly MYSQL_PASSWORD!: string

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { groups: validate_modes },
  )
  @Transform((v) => Number(v.value))
  readonly MYSQL_PORT!: number

  @IsString({ groups: validate_modes })
  readonly MYSQL_USERNAME!: string

  @IsString({ groups: validate_modes })
  readonly MYSQL_REPLICA_HOST!: string

  @IsString({ groups: validate_modes })
  readonly RABBIT_MQ_HOST!: string

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { groups: validate_modes },
  )
  @Transform((v) => Number(v.value))
  readonly RABBIT_MQ_PORT!: number

  @IsString({ groups: validate_modes })
  readonly RABBIT_MQ_USERNAME!: string

  @IsString({ groups: validate_modes })
  readonly RABBIT_MQ_PASSWORD!: string

  @IsString({ groups: validate_modes })
  readonly REDIS_HOST!: string

  @IsString({ groups: validate_modes })
  readonly REDIS_PASSWORD!: string

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { groups: validate_modes },
  )
  @Transform((v) => Number(v.value))
  readonly REDIS_PORT!: number

  @IsString()
  readonly TEST_DATABASE: string = ':memory:'

  @IsString()
  readonly ELASTIC_APM_SERVER_URL!: string

  @IsString()
  readonly ELASTIC_APM_SERVICE_NAME!: string
}

const defaultConfigOfTest: Partial<EnvVariable> = {}

export const Config =
  process.env.MODE === 'test'
    ? plainToClass(EnvVariable, Object.assign(process.env, defaultConfigOfTest))
    : plainToClass(EnvVariable, process.env)

const errors = validateSync(Config, { groups: [process.env.MODE] })

if (errors.length) {
  const msg = errors.map((e) => JSON.stringify(e.constraints || {})).join('\n')
  console.error(msg)
}
