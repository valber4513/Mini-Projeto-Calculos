package sistema;

import java.awt.List;
import java.util.ArrayList;
import java.util.Objects;

public class aluno {

	public String nome;
	public int idade;
	public String dataNascimento;
	public String numeroCpf;
	public String registroGeral;
	public String login;
	public String senha;
	
	
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

	public double nota1;
	public double nota2;
	public double nota3;
	public double nota4;
	public double media;

	private ArrayList<Disciplinas> disciplina = new ArrayList<Disciplinas>();

	public ArrayList<Disciplinas> getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(ArrayList<Disciplinas> disciplina) {
		this.disciplina = disciplina;
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

	public double getNota1() {
		return nota1;
	}

	public void setNota1(double nota1) {
		this.nota1 = nota1;
	}

	public double getNota2() {
		return nota2;
	}

	public void setNota2(double nota2) {
		this.nota2 = nota2;
	}

	public double getNota3() {
		return nota3;
	}

	public void setNota3(double nota3) {
		this.nota3 = nota3;
	}

	public double getNota4() {
		return nota4;
	}

	public void setNota4(double nota4) {
		this.nota4 = nota4;
	}

	public double getMedia() {
		return (nota1 + nota2 + nota3 + nota4) / 4;
	}

	public void setMedia(double media) {
		this.media = media;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dataNascimento, disciplina, idade, login, media, nome, nota1, nota2, nota3, nota4,
				numeroCpf, registroGeral, senha);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		aluno other = (aluno) obj;
		return Objects.equals(dataNascimento, other.dataNascimento) && Objects.equals(disciplina, other.disciplina)
				&& idade == other.idade && Objects.equals(login, other.login)
				&& Double.doubleToLongBits(media) == Double.doubleToLongBits(other.media)
				&& Objects.equals(nome, other.nome)
				&& Double.doubleToLongBits(nota1) == Double.doubleToLongBits(other.nota1)
				&& Double.doubleToLongBits(nota2) == Double.doubleToLongBits(other.nota2)
				&& Double.doubleToLongBits(nota3) == Double.doubleToLongBits(other.nota3)
				&& Double.doubleToLongBits(nota4) == Double.doubleToLongBits(other.nota4)
				&& Objects.equals(numeroCpf, other.numeroCpf) && Objects.equals(registroGeral, other.registroGeral)
				&& Objects.equals(senha, other.senha);
	}

	@Override
	public String toString() {
		return "aluno [nome=" + nome + ", idade=" + idade + ", dataNascimento=" + dataNascimento + ", numeroCpf="
				+ numeroCpf + ", registroGeral=" + registroGeral + ", nota1=" + nota1 + ", nota2=" + nota2 + ", nota3="
				+ nota3 + ", nota4=" + nota4 + ", media=" + media + ", getNome()=" + getNome() + ", getIdade()="
				+ getIdade() + ", getDataNascimento()=" + getDataNascimento() + ", getNumeroCpf()=" + getNumeroCpf()
				+ ", getRegistroGeral()=" + getRegistroGeral() + ", getNota1()=" + getNota1() + ", getNota2()="
				+ getNota2() + ", getNota3()=" + getNota3() + ", getNota4()=" + getNota4() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

	public double getMediaNota() {
		double somaNotas = 0.0;
		for (Disciplinas disciplina : disciplina)
			somaNotas += disciplina.getNota();
		return somaNotas / disciplina.size();
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
