package sistema;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Aluno {

    private String nome;
    private int idade;
    private String dataNascimento;
    private String numeroCpf;
    private String registroGeral;
    private String login;
    private String senha;

    private List<Disciplinas> disciplina = new ArrayList<>();

    public Aluno() {
        // Construtor vazio
    }

    public Aluno(String nome, int idade, String dataNascimento, String numeroCpf, String registroGeral, String login, String senha) {
        this.nome = nome;
        this.idade = idade;
        this.dataNascimento = dataNascimento;
        this.numeroCpf = numeroCpf;
        this.registroGeral = registroGeral;
        this.login = login;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNumeroCpf() {
        return numeroCpf;
    }

    public void setNumeroCpf(String numeroCpf) {
        this.numeroCpf = numeroCpf;
    }

    public String getRegistroGeral() {
        return registroGeral;
    }

    public void setRegistroGeral(String registroGeral) {
        this.registroGeral = registroGeral;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Disciplinas> getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(List<Disciplinas> disciplina) {
        this.disciplina = disciplina;
    }

    @Override
    public int hashCode() {
        return Objects.hash(dataNascimento, disciplina, idade, login, nome, numeroCpf, registroGeral, senha);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Aluno aluno = (Aluno) obj;
        return idade == aluno.idade &&
                Objects.equals(nome, aluno.nome) &&
                Objects.equals(dataNascimento, aluno.dataNascimento) &&
                Objects.equals(numeroCpf, aluno.numeroCpf) &&
                Objects.equals(registroGeral, aluno.registroGeral) &&
                Objects.equals(login, aluno.login) &&
                Objects.equals(senha, aluno.senha);
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "nome='" + nome + '\'' +
                ", idade=" + idade +
                ", dataNascimento='" + dataNascimento + '\'' +
                ", numeroCpf='" + numeroCpf + '\'' +
                ", registroGeral='" + registroGeral + '\'' +
                ", login='" + login + '\'' +
                ", senha='" + senha + '\'' +
                ", disciplina=" + disciplina +
                '}';
    }

    public double getMediaNota() {
        double somaNotas = 0.0;
        for (Disciplinas disciplina : disciplina)
            somaNotas += disciplina.getNota();
        return disciplina.isEmpty() ? 0.0 : somaNotas / disciplina.size();
    }

    public String getAlunoAprovado2() {
        double media = this.getMediaNota();
        if (media >= 50) {
            if (media >= 70) {
                return " APROVADO ";
            } else {
                return " RECUPERAÇÃO ";
            }
        } else {
            return " REPROVADO ";
        }
    }
}