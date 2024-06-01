import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "./validation";
import styles from "./form.module.scss";

// 1 infer の意味 => 推測する スキーマから型を作成してくれる
// 以下の型が定義される
// type ContactFormData = {
//   fullName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   transform: string;
// }
type ContactFormData = yup.InferType<typeof schema>;

export const Form = () => {
  // 2
  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    resolver: yupResolver(schema), // Yupとの紐づけ
    mode: "onBlur", // バリデーションチェックのタイミングを設定
  });
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    //入力したデータを使って任意の処理を実装する
    console.log(data);
  };

  const data: ContactFormData = {
    fullName: 'hoge',
    email: 'hoge@fuga.com',
    password: 'A1!b2@d3#f',
    confirmPassword: 'A1!b2@d3#f',
    transform: 'AAA',
    customTest: '豊崎愛生'
  }

  // promiseを返してくる
  console.log(schema.validate(data))

  // 3
  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h1>
        会員登録
      </h1>
      <div>
        会員登録に必要な情報をご入力ください。
      </div>
      <div className={styles.formItemWrapper}>
        <label>フルネーム</label>
        <input {...register("fullName")} />
        <span className={styles.formErrorMessage}>{formState.errors.fullName?.message}</span>
      </div>
      <div className={styles.formItemWrapper}>
        <label>メールアドレス</label>
        <input {...register("email")} />
        <span className={styles.formErrorMessage}>{formState.errors.email?.message}</span>
      </div>
      <div className={styles.formItemWrapper}>
        <label>パスワード</label>
        <input type="password" autoComplete="false" {...register("password")} />
        <span className={styles.formErrorMessage}>{formState.errors.password?.message}</span>
      </div>
      <div className={styles.formItemWrapper}>
        <label>パスワード(確認)</label>
        <input type="password" autoComplete="false" {...register("confirmPassword")} />
        <span className={styles.formErrorMessage}>{formState.errors.confirmPassword?.message}</span>
      </div>
      <div className={styles.formItemWrapper}>
        <label>変換テスト</label>
        <input {...register("transform")} />
        <span className={styles.formErrorMessage}>{formState.errors.transform?.message}</span>
      </div>
      <div className={styles.formItemWrapper}>
        <label>豊崎愛生でなければならない(カスタムテストの確認)</label>
        <input {...register("customTest")} />
        <span className={styles.formErrorMessage}>{formState.errors.customTest?.message}</span>
      </div>
      <div className={styles.buttonContainer}>
        <button disabled={!formState.isValid}>送信</button>
      </div>
    </form>
  );
};