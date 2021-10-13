package sistema;

import java.util.ArrayList;
import java.util.List;

import javax.swing.JOptionPane;

/* Mini Sistema de calculos de notas. Usuário coloca seu Login e senha
 *  depois entra com seus dados pessoais, no final entra com as matérias e suas notas
 *  calculando e trazendo a situação Final aprovado, reprovado ou em recuperação */

public class execucao {

	public static void main(String[] args) {

		String login = JOptionPane.showInputDialog("LOGIN ");
		String senha = JOptionPane.showInputDialog("SENHA ");

		if (login.equalsIgnoreCase("admin") && senha.equalsIgnoreCase("admin")) {

			List<aluno> alunos = new ArrayList<aluno>();

			for (int poss = 1; poss <= 1; poss++) {

				aluno Aluno1 = new aluno();

				String nome = JOptionPane.showInputDialog("Usuário " + poss + "");
				String idade = JOptionPane.showInputDialog("Digite a idade(Somente Numeros");
				String dataNascimento = JOptionPane.showInputDialog(" Data de Nascimento");
				String numeroCpf = JOptionPane.showInputDialog("CPF");
				String registroGeral = JOptionPane.showInputDialog("Registro Geral");

				Aluno1.setNome(nome);
				Aluno1.setIdade(Integer.valueOf(idade));
				Aluno1.setDataNascimento(nome);
				Aluno1.setNumeroCpf(numeroCpf);
				Aluno1.setRegistroGeral(registroGeral);
				Aluno1.setLogin(login);
				Aluno1.setSenha(senha);

				for (int pos = 1; pos <= 3; pos++) {

					String nomeDisciplina = JOptionPane.showInputDialog("Nome da Disciplina " + pos + "?");
					String notaDisciplina = JOptionPane.showInputDialog("Nota da Disciplina " + pos + "?");

					Disciplinas disciplina = new Disciplinas();
					disciplina.setDisciplina(nomeDisciplina);
					disciplina.setNota(Double.valueOf(notaDisciplina));

					Aluno1.getDisciplina().add(disciplina);

				}

				alunos.add(Aluno1);
			}
			for (aluno Aluno : alunos) {
				JOptionPane.showMessageDialog(null, "Ficha Cadastral COMPLETA");

				System.out.println("Login:  " + Aluno.getLogin() + "   Senha:   " + Aluno.getSenha());
				System.out.println("Todos os Dados:  " + Aluno);
				System.out.println(" Media Das Notas  =  " + Aluno.getMediaNota());
				System.out.println("Condição Final: " + Aluno.getAlunoAprovado2());
				System.out.println("_________________________________________");
				System.out.println("Matérias" + Aluno.getDisciplina());

			}

		}
	}
}
