import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ResponseInterceptor } from '../api.interceptor'
import { ApiResponseDetail } from '../api.response'
import { _Template } from '../connection/mysql/entity/template.entity'
import { Req, Res } from './dev.dto'
import { DevService } from './dev.service'

@Controller()
@ApiTags('currency')
@ApiExtraModels(Res.DevResp)
@UseInterceptors(ResponseInterceptor)
export class DevController {
  constructor(
    @Inject(DevService)
    private devService: DevService,
    @InjectRepository(_Template)
    private _templateRepository: Repository<_Template>,
  ) {}

  @Get('/dev')
  @ApiResponseDetail(Res.DevResp)
  async dev_get(@Query() param: Req.DevParam): Promise<Res.DevResp> {
    return { greeting: await this.devService.sayHi(param.name) }
  }

  @Post('/dev')
  async dev_post(@Body() param: Req.DevParam) {
    console.log(param.name)
    return this.devService.redisDemo()
  }
}
