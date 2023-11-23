package sistema.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import sistema.Aluno;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class AlunoController {

    private final List<Aluno> listaAlunos = new ArrayList<>();

    @GetMapping({"/", "/formulario"})
    public String mostrarFormulario(Aluno aluno, Model model) {
        List<String> listaDisciplinas = Arrays.asList("Matemática", "Português", "História", "Geografia", "Ciências");
        model.addAttribute("listaDisciplinas", listaDisciplinas);
        return "formulario";
    }

    @PostMapping("/formulario")
    public String processarFormulario(Aluno aluno) {
        listaAlunos.add(aluno);
        return "redirect:/resultado";
    }

    @GetMapping("/resultado")
    public String mostrarResultado(Model model) {
        if (!listaAlunos.isEmpty()) {
            Aluno aluno = listaAlunos.get(0);
            model.addAttribute("aluno", aluno);
        }
        return "resultado";
    }
}