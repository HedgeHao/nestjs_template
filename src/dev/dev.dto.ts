import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export namespace Req {
  export class DevParam {
    @IsString()
    @ApiProperty({ type: String })
    name!: string
  }
}

export namespace Res {
  export class DevResp {
    @ApiProperty({ type: String })
    greeting!: string
  }
}
