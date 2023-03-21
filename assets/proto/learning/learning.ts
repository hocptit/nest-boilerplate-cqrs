/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "learning";

export interface GetLearningRequest {
  name: string;
}

export interface GetLearningResponse {
  message: string;
}

export const LEARNING_PACKAGE_NAME = "learning";

export interface LearningServiceClient {
  getLearning(request: GetLearningRequest): Observable<GetLearningResponse>;
}

export interface LearningServiceController {
  getLearning(
    request: GetLearningRequest,
  ): Promise<GetLearningResponse> | Observable<GetLearningResponse> | GetLearningResponse;
}

export function LearningServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getLearning"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("LearningService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("LearningService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LEARNING_SERVICE_NAME = "LearningService";
