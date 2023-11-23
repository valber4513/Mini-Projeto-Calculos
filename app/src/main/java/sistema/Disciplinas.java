package sistema;

import java.util.Objects;

public class Disciplinas {

    private double nota;
    private String disciplina;

    public Disciplinas() {
        // Construtor vazio
    }

    public Disciplinas(double nota, String disciplina) {
        this.nota = nota;
        this.disciplina = disciplina;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }

    @Override
    public int hashCode() {
        return Objects.hash(disciplina, nota);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Disciplinas that = (Disciplinas) obj;
        return Double.compare(that.nota, nota) == 0 &&
                Objects.equals(disciplina, that.disciplina);
    }

    @Override
    public String toString() {
        return "Disciplinas{" +
                "nota=" + nota +
                ", disciplina='" + disciplina + '\'' +
                '}';
    }
}