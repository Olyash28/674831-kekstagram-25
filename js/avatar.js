const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const miniPreviews = document.querySelectorAll('.effects__preview');

const chooseFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isMatched = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (isMatched) {
    preview.src = URL.createObjectURL(file);
    miniPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${ URL.createObjectURL(file) })`;
    });
  }
};

export {chooseFile};
