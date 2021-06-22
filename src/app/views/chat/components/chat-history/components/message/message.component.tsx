import { FC } from 'react';

import Avatar from 'boring-avatars';

import './message.styles.css';

interface MessageProps {
  senderName: string;
  text: string;
}

const avatarNames = [
  'Mary Baker',
  'Amelia Earhart',
  'Mary Roebling',
  'Sarah Winnemucca',
  'Margaret Brent',
  'Lucy Stone',
  'Mary Edwards',
  'Margaret Chase',
  'Mahalia Jackson',
  'Maya Angelou',
  'Margaret Bourke',
  'Eunice Kennedy',
  'Carrie Chapman',
  'Elizabeth Peratrovich',
  'Alicia Dickerson',
  'Daisy Gatson',
  'Emma Willard',
  'Amelia Boynton',
  'Maria Mitchell',
  'Sojourner Truth',
  'Willa Cather',
  'Coretta Scott',
  'Harriet Tubman',
  'Fabiola Cabeza',
  'Sacagawea',
  'Esther Martinez',
  'Elizabeth Cady',
  'Bessie Coleman',
  'Ma Rainey',
  'Julia Ward',
  'Irene Morgan',
  'Babe Didrikson',
  'Lyda Conley',
  'Annie Dodge',
  'Maud Nathan',
  'Betty Ford',
  'Rosa Parks',
  'Susan La',
  'Gertrude Stein',
  'Wilma Mankiller',
  'Grace Hopper',
  'Jane Addams',
  'Katharine Graham',
  'Florence Chadwick',
  'Zora Neale',
  'Wilma Rudolph',
  'Annie Jump',
  'Mother Frances',
  'Jovita Idár',
  'Maggie L',
  'Henrietta Swan',
  'Jane Cunningham',
  'Victoria Woodhull',
  'Helen Keller',
  'Patsy Takemoto',
  'Chien-Shiung',
  'Dorothea Dix',
  'Margaret Sanger',
  'Alice Paul',
  'Frances Willard',
  'Sally Ride',
  'Juliette Gordon',
  'Queen Lili',
  'Katharine Lee',
  'Harriet Beecher',
  'Felisa Rincon',
  'Hetty Green',
  'Belva Lockwood',
  'Biddy Mason',
  'Ida B',
  'Eleanor Roosevelt',
  'Maria Goeppert',
  'Phillis Wheatley',
  'Mary Harris',
  'Fannie Lou',
  'Rosalyn Yalow',
  'Susan B',
  'Clara Barton',
  'Lady Deborah',
  'Jane Johnston',
  'Alice Childress',
  'Georgia O',
  'Rebecca Crumpler',
  'Anne Bradstreet',
  'Elizabeth Blackwell',
  'Christa McAuliffe',
  'Edmonia Lewis',
  'Nellie Bly',
  'Mary Cassatt',
  'Pauli Murray',
  'Ellen Swallow',
  'Hedy Lamarr',
  'Pearl Kendrick',
  'Abigail Adams',
  'Margaret Fuller',
  'Emma Lazarus',
  'Marian Anderson',
  'Virginia Apgar',
  'Mary Walton'
];

const avatarColorPatterns = [
  ['#45AAB8', '#E1D772', '#FAF4B1', '#394240', '#F06B50'],
  ['#AAFF00', '#FFAA00', '#FF00AA', '#AA00FF', '#00AAFF'],
  ['#2E1E45', '#612A52', '#BA3259', '#FF695C', '#CCBCA1'],
  ['#FDBF5C', '#F69A0B', '#D43A00', '#9B0800', '#1D2440'],
  ['#172C3C', '#274862', '#995052', '#D96831', '#E6B33D'],
  ['#7E5686', '#A5AAD9', '#E8F9A2', '#F8A13F', '#BA3C3D'],
  ['#A8BCBD', '#FCDCB3', '#F88D87', '#D65981', '#823772'],
  ['#BF2A23', '#A6AD3C', '#F0CE4E', '#CF872E', '#8A211D'],
  ['#8A211D', '#FF824A', '#FEA887', '#F6E7F7', '#D1D0D7'],
  ['#E3E8CD', '#BCD8BF', '#D3B9A3', '#EE9C92', '#FE857E'],
  ['#F7EAD9', '#E1D2A9', '#88B499', '#619885', '#67594E'],
  ['#FDBF5C', '#F69A0B', '#D43A00', '#9B0800', '#1D2440'],
  ['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989'],
  ['#3FB8AF', '#7FC7AF', '#DAD8A7', '#FF9E9D', '#FF3D7F'],
  ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']
];

const getRandomValueFromArray = <T extends {}>(array: T[]): T => {
  return array.sort(() => Math.random() - Math.random()).find(() => true)!;
};

export const Message: FC<MessageProps> = (props: MessageProps) => {
  const randomAvatarName = getRandomValueFromArray(avatarNames);
  const randomColorPattern = getRandomValueFromArray(avatarColorPatterns);

  return (
    <div className="message">
      <div className="message__row1">
        <Avatar size={40} name={randomAvatarName} variant="beam" colors={randomColorPattern} />
        <h3 className="message__sender-name">{props.senderName}</h3>
      </div>
      <p className="message__text">{props.text}</p>
    </div>
  );
};
