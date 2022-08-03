const $form = document.querySelector('.form');
  const $container = document.querySelector('.records');
  const registers = [...JSON.parse(localStorage.data)];

  function createRegister(e) {
    e.preventDefault();
    const username = document.querySelector('input[name=name]');
    const password = document.querySelector('input[name=password]');

    const register = {
      username: username.value,
      password: password.value
    }

    registers.push(register);

    localStorage.setItem('data', JSON.stringify(registers));

    username.value = '';
    password.value = '';

    readRegister();
  }
  $form.addEventListener('submit', createRegister);

  function readRegister(){
    $container.innerHTML = '';
    const data = JSON.parse(localStorage.getItem('data'));

    data.map((register, index) => {
      const $registerBox = document.createElement('div');
      $container.appendChild($registerBox);
      $registerBox.setAttribute('id',index);

      const $infoWrap = document.createElement('div');
      $registerBox.appendChild($infoWrap);
      $infoWrap.classList.add('info-wrap');

      const $actionsWrap = document.createElement('div');
      $registerBox.appendChild($actionsWrap);
      $actionsWrap.classList.add('actions-wrap');

      const $username = document.createElement('h4');
      $username.innerText = 'usuário: ' + register.username;
      $infoWrap.appendChild($username);

      const $password = document.createElement('p');
      $password.innerText = 'senha: ' + register.password;
      $infoWrap.appendChild($password);

      const $editBtn = document.createElement('button');
      $editBtn.innerText = 'Editar'
      $actionsWrap.appendChild($editBtn);

      const $excludeBtn = document.createElement('button');
      $excludeBtn.innerText = 'Excluir'
      $actionsWrap.appendChild($excludeBtn);
    }) 
  }
  readRegister();

  $editButtons = document.querySelectorAll('.actions-wrap :first-child');
  $editButtons.forEach(editButton => {
    editButton.addEventListener('click', updateRegister)
  });

  function updateRegister(e){
    $register = e.target.parentNode.parentNode;
    const newUsername = prompt('Digite o novo usuário');
    const newPassword = prompt('Digite a nova senha');

    const registers = JSON.parse(localStorage.data);
    const register = registers[$register.getAttribute('id')];
    register.username = newUsername;
    register.password = newPassword;

    registers[$register.getAttribute('id')] = register;
    localStorage.setItem('data', JSON.stringify(registers));
    
    $register.firstChild.firstChild.innerText = `usuário: ${newUsername}`;
    $register.firstChild.lastChild.innerText = `senha: ${newPassword}`;
  }

  $excludeButtons = document.querySelectorAll('.actions-wrap :last-child');
  $excludeButtons.forEach(excludeButton => {
    excludeButton.addEventListener('click', deleteRegister)
  });

  function deleteRegister(e){
    $register = e.target.parentNode.parentNode;
    $register.remove();

    const registers = JSON.parse(localStorage.data);
    const registerId = $register.getAttribute('id');

    const updatedRegisters = registers.filter((item, index) => {
        return index != registerId;
    })
    localStorage.setItem('data', JSON.stringify(updatedRegisters));
  }