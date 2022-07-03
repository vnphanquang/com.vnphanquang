import { OnModuleInit } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // this.enableSoftDelete();
  }

  // async enableSoftDelete() {
  //   // on:delete set soft delete timestamp: deletedAt = current()
  //   this.$use(async (params, next) => {
  //     if (params.action === 'delete') {
  //       params.action = 'update';
  //       params.args['data'] = { deleted: true };
  //     } else if (params.action === 'deleteMany') {
  //       params.action = 'updateMany';
  //       if (params.args.data != undefined) {
  //         params.args.data['deletedAt'] = new Date();
  //       } else {
  //         params.args['data'] = {
  //           deletedAt: new Date(),
  //         };
  //       }
  //     }
  //     return next(params);
  //   });

  //   // on:update filter where deletedAt = null
  //   this.$use(async (params, next) => {
  //     if (params.action === 'update') {
  //       // Change to updateMany - you cannot filter
  //       // by anything except ID / unique with findUnique
  //       params.action = 'updateMany';
  //       // Add 'deletedAt' filter
  //       // ID filter maintained
  //       params.args.where['deletedAt'] = null;
  //     } else if (params.action === 'updateMany') {
  //       if (params.args.where != undefined) {
  //         params.args.where['deletedAt'] = null;
  //       } else {
  //         params.args['where'] = { deletedAt: null };
  //       }
  //     }
  //     return next(params);
  //   });
  // }

  async enableShutdownHooks(_app: INestApplication) {
    this.$on('beforeExit', async () => {
      console.log('Shutting down prisma...');
    });
  }
}
