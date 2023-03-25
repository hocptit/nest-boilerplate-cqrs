import { ErrorConstant } from '@app/constants/error.constant';
import { BaseError } from '@libs/shared';

export class ENotFoundArticle extends BaseError {
  public errorCode = ErrorConstant.ARTICLE.NOT_FOUND_ARTICLE.ERROR_CODE;
  static readonly message = ErrorConstant.ARTICLE.NOT_FOUND_ARTICLE.MESSAGE;
  constructor() {
    super(ENotFoundArticle.message);
  }
}
