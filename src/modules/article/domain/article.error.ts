import { ErrorConstant } from '../../../constants/error.constant';
import { BaseError } from '@shared/cqrs/errors/error.base';
export class ENotFoundArticle extends BaseError {
  code: string;
  static code = ErrorConstant.ARTICLE.NOT_FOUND_ARTICLE.CODE;
  static readonly message = ErrorConstant.ARTICLE.NOT_FOUND_ARTICLE.MESSAGE;
  constructor() {
    super(ENotFoundArticle.message);
  }
}
