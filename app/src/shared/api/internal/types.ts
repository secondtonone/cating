export type Zodiacs =  'gemini' | 'cancer' | 'leo';

export interface Person {
  id: string
  name: string
  age: string | number
  about: string
  location: string
  zodiac: Zodiacs
  photos: string[]
}
