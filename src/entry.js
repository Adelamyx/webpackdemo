import reset from './css/reset.css';
import css from './css/srdemo.css';
import less from './css/black.less';
import sass from './css/demo.scss';
import $ from 'jquery';

{
  let mm = 'hello maomao';
  document.getElementById('title').innerHTML = mm;
  $('#title').click(() => {
    alert(111)
  });
}
