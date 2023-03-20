import { join } from 'path';

export function getProtoPath(serviceName: string, protoName: string): string {
  return join(__dirname, '../../../assets/proto', serviceName, protoName);
}
