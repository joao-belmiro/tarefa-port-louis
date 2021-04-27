
new Vue({
  el: '#app',
  data: {
    titulo: 'Novo Registro',
    icone: 'fas fa-save',
    label: 'Salvar',
      usuario: {
        id: null,
        nome: null,
        telefone: null
      },
      usuarios:[]
    },
    computed: {
        getTelefone () {
          return this.usuario.telefone
        },
        getNomeUsuario () {
            return this.usuario.nome
        }
    },
    watch: {
       getNomeUsuario (atual) {
        const self = this
        let inputTelefone = document.getElementById('nomeUsuario')
        inputTelefone.addEventListener('blur', function (event) {
            inputTelefone.classList.remove('is-invalid')
            inputTelefone.classList.remove('is-valid')
            if (!self.validarNome(atual)) {
                event.preventDefault()
                event.stopPropagation()
                inputTelefone.classList.add('is-invalid')
            } else{
                inputTelefone.classList.remove('is-valid')
            }
        },false)
       },
       getTelefone (atual) {
            let inputTelefone = document.getElementById('telefoneUsuario')
            inputTelefone.addEventListener('blur', function (event) {
                inputTelefone.classList.remove('is-invalid')
                inputTelefone.classList.remove('is-valid')
                if (atual !== null && atual.length !== 11) {
                    event.preventDefault()
                    event.stopPropagation()
                    inputTelefone.classList.add('is-invalid')
                } else{
                    inputTelefone.classList.remove('is-valid')
                }
            },false)
       } 
    },
    mounted () {
        this.mascaraTelefone()
    },
    
    methods: {
        salvar: function () {
            if (this.validarNome(this.usuario.nome) && this.usuario.telefone.length === 11) {
                if (this.usuario.id === null) {
                    this.usuario.id = this.usuarios.length + 1
                    this.usuarios.push(Object.assign({}, this.usuario))
                } else {
                    let index = this.usuarios.findIndex(user => user.id = this.usuario.id)
                    for (let chave in this.usuario) {
                        this.usuarios[index][chave] = this.usuario[chave]
                    }
                }
                $("#alerta").toast('show')
                this.limpar()
            }
        },
        validarNome:function (nome) {
            if (nome !== null) {
                let separarNome = nome.split(' ')
                let valid = false
                for (let i in separarNome) {
                    valid = separarNome[i].length >=3 ? true: false
                }
                return separarNome.length >= 2 && valid
            }
        },
        limpar: function () {
            setTimeout(() => {
                for (let chave in this.usuario) {
                    this.usuario[chave] = null
                }
                this.titulo = 'Novo Registro'
                this.icone = 'fas fa-save'
                this.label = 'Salvar'
                this.hideModal()
            }, 500);
        },
        editar: function(usuario) {
            this.titulo = 'Alterar Registro'
            this.icone = 'fas fa-edit'
            this.label = 'Alterar'
            for(let chave in usuario) {
                this.usuario[chave] = usuario[chave]
            }
            this.showModal()
        },
        excluir: function(usuario) {
            this.usuarios = this.usuarios.filter(u => u.id !== usuario.id)
            $("#alerta").toast('show')
        },
        formatPhone: function (telefone) {
            let val = telefone.replace(/\-/g, '');
            const p1 = val.slice(0, 2);
            const p2 = val.slice(2, 7);
            const p3 = val.slice(7, 11);
            val = `(${p1}) ${p2}-${p3}`;
            return val;
        },
        linhaAzul (telefone) {
            let codArea = telefone.substring(0,2)
            return codArea === '11'
        },
        showModal: function () {
            $("#myModal").modal('show')
        }, 
        hideModal : function () {
            $("#myModal").modal('hide')
        },
        mascaraTelefone: function () {
            const self = this
            var telefone = document.querySelector("#telefoneUsuario");
            telefone.addEventListener("blur", function () {
              if (telefone.value)
                telefone.value = self.formatPhone(telefone.value)
            });
        }
    }
})