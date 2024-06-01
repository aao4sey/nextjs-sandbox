import * as yup from 'yup'

// ref https://zenn.dev/loglass/articles/abe85e10e229f3#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%A7%E3%82%82%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B9%E3%83%88%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B

// urlのフォーマットを定義するカスタムフォーマットを定義
const urlFormatValidator = function (
  value: unknown,
  { path, createError }: yup.TestContext
) {
  if (typeof value !== 'string') return true;
  const pattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g
  const isValid = !!value.match(pattern)
  return isValid ? true : createError({ path, message: '正しい形式のURLを入力してください。' })
}

// StringSchemaにカスタムバリデーションを登録する

yup.addMethod<yup.StringSchema>(yup.string, "urlFormat", function () {
  return this.test('urlFormat', '', function (value: unknown) {
    return urlFormatValidator(value, this)
  })
});

// StringSchemaを拡張する
declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    urlFormat(): StringSchema<NonNullable<TType>, TContext, TDefault, TFlags>;
  }
}

export const validator = yup;