import { Module } from '@nestjs/common'
import { ConnectionModule, modelList, RepositoryModule } from './mysql.config'

@Module({
  imports: [...ConnectionModule, ...RepositoryModule],
  exports: [...RepositoryModule, ...modelList],
  providers: modelList,
})
export class MysqlModule {
  // static async isAlive() {
  //   // [ [RowDataPacket { '1': 1 }], [RowDataPacket { '1': 1 }] ]
  //   const result = await Promise.all([
  //     getConnection(connection.default).query('select 1'),
  //     getConnection(connection.readonly).query('select 1'),
  //   ]).catch(errorHandler);
  //   if (!result) {
  //     return false;
  //   }
  //   return result.map((x) => x[0]['1']).reduce((a, b) => a + b) === 2;
  // }
}
