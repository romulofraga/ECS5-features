import api from "./api";

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById("repo-form");
    this.listEl = document.getElementById("repo-list");
    this.inputEl = document.getElementById("repo-input");

    this.registerHandlers();
  }
  registerHandlers() {
    this.formEl.onsubmit = (event) => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement("span");
      loadingEl.appendChild(document.createTextNode("Carregando..."));
      loadingEl.setAttribute("id", "loading");

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById("loading").remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    console.info("repositorio pesquisado: ", repoInput);

    this.setLoading();

    try {
      const response = await api.get(`/repos/${repoInput}`);

      const {
        name,
        description,
        html_url,
        owner: { avatar_url },
      } = response.data;

      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
      });

      this.inputEl.value = "";

      // console.log(this.repositories);

      this.render();
    } catch (error) {
      alert("O REPOSITÓRIO NAO EXISTE", error);
      this.inputEl.value = "";
    }

    this.setLoading(false);
  }

  render() {
    this.listEl.innerHTML = "";

    this.repositories.forEach((itemRepo) => {
      let imgEl = document.createElement("img"); //cria um elemento  <img></img>
      imgEl.setAttribute("src", itemRepo.avatar_url);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(itemRepo.name));

      let descriptionEl = document.createElement("p");
      descriptionEl.appendChild(document.createTextNode(itemRepo.description));

      let linkEl = document.createElement("a");
      linkEl.setAttribute("target", "_blank");
      linkEl.setAttribute("href", itemRepo.html_url);
      linkEl.appendChild(document.createTextNode("Acessar Repositório"));

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();
