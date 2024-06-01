import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { validator } from './customValidation'
import { InferType, string } from 'yup'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { error } from 'console'


enum RecipeType {
  Main = 'main',
  Side = 'side'
}

const RecipeForm = () => {
  const schema = validator.object().shape({
    title: validator.string().required('タイトルは必須です。'),
    url: validator.string().required('URLは必須です。').urlFormat(),
    // https://github.com/jquense/yup/issues/1013#issuecomment-679113073
    type: validator.mixed<RecipeType>().oneOf(Object.values(RecipeType)).required(),
    ingradient: validator.array().of(validator.object().shape({
      name: validator.string().required('必須'),
      amount: validator.string().required('必須')
    }))
  })


  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      url: "",
      type: RecipeType.Main,
      ingradient: [{
        name: "",
        amount: ""
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingradient'
  })

  const handleOnClick = () => {
    append({ name: "", amount: "" })
  }

  const displayType = (type: RecipeType): string => {
    switch (type) {
      case "main":
        return '主菜'
      case "side":
        return '副菜'
      default:
        throw 'aa'
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    console.log(JSON.stringify(data))
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl text-center mb-6'>レシピ登録フォーム</h1>
      <Form {...form} className="w-2/3 space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* FormFieldは react-hook-formの Controllerのラッパー */}
          <FormField
            control={form.control}
            name="title"
            render={(f) => {
              const { field } = f
              return (<FormItem className='mb-4'>
                <FormLabel className='font-bold'>レシピ名</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="レシピ名" />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>)
            }}
          />
          <FormField
            control={form.control}
            name="url"
            render={(f) => {
              const { field } = f
              return (<FormItem className='mb-4'>
                <FormLabel className='font-bold'>レシピサイトURL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="レシピサイトURL" />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>)
            }}
          />
          <FormField
            control={form.control}
            name="type"
            render={(f) => {
              const { field } = f
              return (<FormItem className="space-y-3 mb-4">
                <FormLabel className='font-bold'>レシピタイプ</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-3 px-2"
                  >
                    {Object.values(RecipeType).map((type) => {
                      return (
                        <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {displayType(type)}
                          </FormLabel>
                        </FormItem>)
                    })}
                  </RadioGroup>
                </FormControl>
                {/* FormMessage で fieldStateにerrorがあれば表示してくれる */}
                <FormMessage />
              </FormItem>)
            }}
          />
          <div className='flex flex-row justify-between mb-2'>
            <div className='align-middle'>
              <FormLabel className='font-bold block'>材料</FormLabel>
            </div>
            <div>
              <Button onClick={handleOnClick}>追加</Button>
            </div>
          </div>
          <ul className=''>
            {fields.map((item, index) => (
              <li key={item.id} className='mb-2'>
                <div className="flex w-full items-center space-x-2">
                  <FormField
                    render={({ field }) => <Input {...field} placeholder='材料名' />}
                    name={`ingradient.${index}.name`}
                    control={form.control}
                  />
                  <FormField
                    render={({ field }) => <Input {...field} placeholder='分量' />}
                    name={`ingradient.${index}.amount`}
                    control={form.control}
                  />
                  <Button type="button" onClick={() => remove(index)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>

          <Button type='submit' className='w-full'>送信</Button>
        </form>
      </Form>
    </div >
  )
}

export default RecipeForm