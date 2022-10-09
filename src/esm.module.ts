import { Injectable, Module, OnModuleInit } from '@nestjs/common'
import { Got } from 'got'

@Injectable()
export class ESMService implements OnModuleInit {
  got: Got

  /**
   * Workaround for import ESM package. see https://jaywolfe.dev/how-to-use-es-modules-with-older-node-js-projects-the-right-way/
   * @param name
   * @returns
   */
  private dynamicImport(name: string) {
    return new Function(`return import('${name}')`)()
  }

  async onModuleInit() {
    this.got = (await this.dynamicImport('got')).default
  }
}

@Module({
  providers: [ESMService],
  exports: [ESMService],
})
export class ESMModule {}
