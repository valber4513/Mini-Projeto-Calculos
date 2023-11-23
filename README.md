# Mini Projeto - Sistema de Cálculos de Notas com Spring Boot

Este é um mini projeto desenvolvido com Spring Boot para criar um sistema de cálculos de notas de alunos. O projeto permite que os usuários preencham informações sobre os alunos, incluindo suas notas em diferentes disciplinas, e exibe um resultado com a média das notas e a situação final do aluno (aprovado, em recuperação ou reprovado).

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Java JDK 11 ou superior
- Gradle (ou utilize o Gradle Wrapper fornecido no projeto)

## Instruções de Execução

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/valber4513/Mini-Projeto-Calculos.git
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd Mini-Projeto-Calculos
    ```

3. **Execute o aplicativo Spring Boot:**

    ```bash
    ./gradlew bootRun
    ```

    O aplicativo estará disponível em [http://localhost:8080](http://localhost:8080).

4. **Acesse o formulário de aluno em seu navegador:**

    [http://localhost:8080/formulario](http://localhost:8080/formulario)

5. **Preencha as informações do aluno e as notas nas disciplinas desejadas.**

6. **Após enviar o formulário, visualize o resultado em:**

    [http://localhost:8080/resultado](http://localhost:8080/resultado)

## Tecnologias Utilizadas

- Spring Boot
- Thymeleaf (para templates HTML)
- Bootstrap (para estilização)

## Estrutura do Projeto

- **src/main/java/controller/AlunoController.java**: Controlador responsável por lidar com as requisições HTTP relacionadas aos alunos.
- **src/main/java/sistema/Aluno.java**: Classe que representa um aluno e contém a lógica de cálculo de média e situação final.
- **src/main/java/sistema/Disciplinas.java**: Classe que representa as disciplinas e suas notas.
- **src/main/java/sistema/MainApplication.java**: Ponto de entrada principal do aplicativo Spring Boot.
- **src/main/resources/templates/formulario.html**: Template Thymeleaf para o formulário de aluno.
- **src/main/resources/templates/resultado.html**: Template Thymeleaf para exibir o resultado.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novos recursos. Crie um fork do projeto, faça suas alterações e envie uma pull request.

Espero que aproveite o projeto! 😊
