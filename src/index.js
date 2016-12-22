import numeral from 'numeral';
import { getUsers, deleteUser } from './api/userApi';
import './index.css'; // Importing CSS thanks to Webpack.

const cost = numeral(1000).format('$0,0.00');

console.log(`Your cost is ${cost} for this course.`); // eslint-disable-line no-console

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`;
  });

  global.document.getElementById('users').innerHTML = usersBody;

  // This DOM API doesn't return a real array, so we have to get it into one with Array.from.
  const deleteLinks = global.document.getElementsByClassName('deleteUser');
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes['data-id'].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });

});
