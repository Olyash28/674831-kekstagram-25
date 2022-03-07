function getRandomNumber(firstNumber, lastNumber) {
  if (firstNumber >= 0 && lastNumber > firstNumber) {
    return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
  }
  return ('Напишите что-нибудь другое');
}

//Ссылки на источники:
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://learn.javascript.ru/number


function checkCommentLength(message, maxLength) {
  const messageLength = message.length;

  return (messageLength <= maxLength);
}

checkCommentLength();

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Принцесса Лея',
  'Гарри',
  'Поттер',
  'Лев Николаевич',
  'Дейнерис Бурерождённая',
  'Старик Хоттабыч',
];

const DESCRIPTIONS = [
  'Прекрасная погода',
  'Вот такие пироги',
  'В деревне у бабушки',
  'Вид из окна',
  'Просто новая фоточка',
  'Погуляли',
  'Поели',
  'Ну как-то так',
];

//Создаем комментарий

const createComment = () => ({
  id: Math.round(Date.now() * Math.random()),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)],
});

//Список комментариев
const CommentsList = () => Array.from({length: 8}, createComment);

//Создаем описание фото
const createPhotoDescription = (value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, MESSAGES.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: CommentsList(),
});

//Массив из фоток
const photos = Array.from({length: 25}, createPhotoDescription);
photos();
