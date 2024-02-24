//library imports
import { useFormContext } from 'react-hook-form';

//component imports
import { Label } from '../../../components/ui/label';
import { CardTitle, CardHeader, CardContent, Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { CheckOutFormData } from '../../../types/CheckOutFormData';

//type imports

//TODO - could maybe refactor this to make it more readable - could create an object with all the form inputs and then map over them to create the form

//Check out form - incldues all imputs for checkout - name, street, city, state, zip, email, cardName, cardNumber, expiryDate, cvc
export default function CheckOutForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckOutFormData>();
  return (
    <div className='lg:w-2/3'>
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                {...register('name', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z]+(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/,
                    message: 'Please enter a valid name',
                  },
                })}
                placeholder='Enter your full name'
              />
              {errors.name && (
                <span className='text-red-500'>{errors.name.message?.toString()}</span>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='street'>Street</Label>
              <Input
                {...register('street', { required: 'This field is required' })}
                id='street'
                placeholder='Enter your street'
              />
              {errors.street && (
                <span className='text-red-500'>{errors.street.message?.toString()}</span>
              )}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='city'>City</Label>
                <Input
                  {...register('city', {
                    required: 'This field is required',
                    pattern: { value: /^[a-zA-Z ]+$/, message: 'Please enter a valid city' },
                  })}
                  id='city'
                  placeholder='Enter your city'
                />
                {errors.city && (
                  <span className='text-red-500'>{errors.city.message?.toString()}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='state'>State</Label>
                <Input
                  {...register('state', {
                    required: 'This field is required',
                    minLength: { value: 2, message: 'Please enter a valid state' },
                  })}
                  id='state'
                  placeholder='Enter your state'
                />
                {errors.state && (
                  <span className='text-red-500'>{errors.state.message?.toString()}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='zip'>Zip Code</Label>
                <Input
                  {...register('zip', {
                    required: 'This field is required',
                    pattern: { value: /^[0-9]*$/, message: 'Please enter a valid zip code' },
                    maxLength: { value: 5, message: 'Value must be 5 digits' },
                    minLength: { value: 5, message: 'Value must be 5 digits' },
                  })}
                  id='zip'
                  placeholder='Enter your zip code'
                />
                {errors.zip && (
                  <span className='text-red-500'>{errors.zip.message?.toString()}</span>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Must be a valid email address',
                  },
                })}
                id='email'
                placeholder='Enter your email'
                type='email'
              />
              {errors.email && (
                <span className='text-red-500'>{errors.email.message?.toString()}</span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='cardName'>Name on Card</Label>
              <Input
                {...register('cardName', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z]+(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/,
                    message: 'Please enter a valid name',
                  },
                })}
                id='cardName'
                placeholder='Enter the name on your card'
              />
              {errors.cardName && (
                <span className='text-red-500'>{errors.cardName.message?.toString()}</span>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cardNumber'>Card Number</Label>
              <Input
                {...register('cardNumber', {
                  required: 'This field is required',
                  pattern: { value: /^\d{16}$/, message: 'Please enter a valid card number' },
                })}
                id='cardNumber'
                placeholder='Enter your card number'
                type='text'
              />
              {errors.cardNumber && (
                <span className='text-red-500'>{errors.cardNumber.message?.toString()}</span>
              )}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='expiryDate'>Exp Date</Label>
                <Input
                  {...register('expiryDate', {
                    required: 'This field is required',
                    maxLength: 5,
                    minLength: 5,
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'Please enter a valid date',
                    },
                  })}
                  id='expiryDate'
                  placeholder='MM/YY'
                  type='text'
                />
                {errors.expiryDate && (
                  <span className='text-red-500'>{errors.expiryDate.message?.toString()}</span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cvc'>CVC</Label>
                <Input
                  {...register('cvc', {
                    required: 'This field is required',
                    pattern: { value: /^\d{3}$/, message: 'Please enter a valid code' },
                  })}
                  id='cvc'
                  placeholder='Enter your CVC'
                  type='text'
                />
                {errors.cvc && (
                  <span className='text-red-500'>{errors.cvc.message?.toString()}</span>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
