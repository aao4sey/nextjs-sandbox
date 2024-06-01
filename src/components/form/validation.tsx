import * as Yup from 'yup';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

export const schema = Yup.object().shape({ // 1
  fullName: Yup.string().required("入力必須の項目です。"), // 2
  email: Yup.string()
    .required("入力必須の項目です。")
    .email("メールアドレスの形式が不正です。"), // 3
  password: Yup.string()
    .required("入力必須の項目です。")
    .matches(passwordRegex, "※パスワードは大文字、数字、特殊文字を含む英数字10文字以上で設定してください"), // 4
  confirmPassword: Yup.string()
    .required("入力必須の項目です")
    .oneOf([Yup.ref("password")], "パスワードが一致していません。"), //5  
  // lowercase() 入力値を小文字に変換する
  // strict()をチェーンすると、すべて小文字でなければエラーになる
  transform: Yup.string().lowercase("must be lower case").required("required."),
  customTest: Yup.string().test({
    name: 'is-toyosaki', // name
    skipAbsent: true,
    message: "豊崎愛生じゃないよ",
    test(value) {
      console.log(value)
      return value === '豊崎愛生'
    }
  }).min(4, '最低')
});
