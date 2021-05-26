import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}