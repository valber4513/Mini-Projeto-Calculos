import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: '', idade: '' });
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [Menssagem, setMessagem] = useState('');
  const [novaDisciplina, setNovaDisciplina] = useState({ nome: '', cargaHoraria: '' });
  const [termoPesquisaDisciplina, setTermoPesquisaDisciplina] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [nota, setNota] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
  const [statusList, setStatusList] = useState([]);

  const listarAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/listarAlunos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const listarDisciplinas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/listarDisciplinas');
      setDisciplinas(response.data);
    } catch (error) {
      console.error('Erro ao buscar Disciplinas:', error);
    }
  };

  const cadastrarAluno = async () => {
    try {
      if (parseInt(novoAluno.idade, 10) > 140) {
        setMessagem('Idade inválida');
        setShowPopup(true);
        return;  // Não cadastra o aluno se a idade for maior que 150
      }

      await axios.post('http://localhost:3001/cadastrarAluno', novoAluno);
      listarAlunos();
      setNovoAluno({ nome: '', idade: '' });
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
    }
  };

  const lancarNota = async () => {
    try {
      if (!alunoSelecionado || !disciplinaSelecionada || !nota) {
        setMessagem('Por favor, selecione o aluno, a disciplina e informe a nota.');
        setShowPopup(true);
        return;
      }

      // Faça uma solicitação HTTP para o servidor para lancar a nota.
      await axios.post('http://localhost:3001/lancarNota', {
        alunoId: alunoSelecionado,
        disciplinaId: disciplinaSelecionada,
        nota: nota,
      });

      fetchStatusList(); // Atualiza a lista após lancar a nota.

      // Limpa os campos após lancar a nota.
      setAlunoSelecionado('');
      setDisciplinaSelecionada('');
      setNota('');
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao lancar nota:', error);
    }
  };

  const cadastrarDisciplina = async () => {
    try {
      if (parseInt(novaDisciplina.cargaHoraria, 10) > 240) {
        setMessagem('Carga Horária não pode ser maior que 240 horas');
        setShowPopup(true);
        return;  // Não cadastra o aluno se a idade for maior que 150
      }

      await axios.post('http://localhost:3001/cadastrarDisciplina', novaDisciplina);
      listarDisciplinas();
      setNovaDisciplina({ nome: '', cargaHoraria: '' });
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao cadastrar Disciplina:', error);
    }
  };

  const fetchStatusList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/listarStatus');
      if (response && response.data) {
        const { data: statusList } = response;
        setStatusList(statusList);
      } else {
        console.error('Resposta vazia ou sem dados.');
      }
    } catch (error) {
      console.error('Erro ao buscar status:', error);
    }
  };

  useEffect(() => {
    listarAlunos();
    listarDisciplinas();
    fetchStatusList()
  }, []);

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            href="#home"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'cadastrarAluno' ? 'active' : ''}`}
            onClick={() => setActiveTab('cadastrarAluno')}
            href="#cadastrar"
          >
            Cadastrar Aluno
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'cadastrarDisciplina' ? 'active' : ''}`}
            onClick={() => setActiveTab('cadastrarDisciplina')}
            href="#cadastrar"
          >
            Cadastrar Disciplina
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'listar' ? 'active' : ''}`}
            onClick={() => setActiveTab('listar')}
            href="#listar"
          >
            Listar Alunos
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'listarDisciplinas' ? 'active' : ''}`}
            onClick={() => setActiveTab('listarDisciplinas')}
            href="#listarDisciplinas"
          >
            Listar Disciplinas
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'lancarNota' ? 'active' : ''}`}
            onClick={() => setActiveTab('lancarNota')}
            href="#lancarNota"
          >
            Lancar Nota
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'listarStatus' ? 'active' : ''}`}
            onClick={() => setActiveTab('listarStatus')}
            href="#listarStatus"
          >
            Listar Status
          </a>
        </li>
      </ul>

      {showPopup && (
        <div className="alert alert-warning mt-2" role="alert">
          {Menssagem}
        </div>
      )}

      <div className='tab-content mt-2'>
        <div className={`tab-pane fade ${activeTab === 'listarStatus' ? 'show active' : ''}`} id="listarStatus" style={{ zIndex: 2 }}>
          <h1>Listar Status</h1>
          <ul className="list-group">
            {statusList.map((status) => (
              <li key={status.aluno + status.disciplina} className="list-group-item">
                {`Aluno: ${status.aluno} - Disciplina: ${status.disciplina} - Nota: ${status.nota} - Status: ${status.status}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tab-content mt-2">
        <div className={`tab-pane fade show ${activeTab === 'home' ? 'active' : ''}`} id="home">
          <h1>Bem-vindo à Home</h1>
        </div>

        <div className={`tab-pane fade ${activeTab === 'cadastrarAluno' ? 'show active' : ''}`} id="cadastrarAluno">
          <h1>Cadastrar Aluno</h1>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="Digite o nome do aluno"
              value={novoAluno.nome}
              onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="idade">Idade:</label>
            <input
              type="number"  // Defina o tipo como "number"
              id="idade"
              className="form-control"
              placeholder="Digite a idade do aluno"
              value={novoAluno.idade}
              onChange={(e) => setNovoAluno({ ...novoAluno, idade: e.target.value })}
              pattern="[0-9]*"  // Permita apenas dígitos
            />
          </div>
          <button className="btn btn-primary mt-2 ml-auto" onClick={cadastrarAluno}>
            Cadastrar
          </button>
        </div>

        <div className={`tab-pane fade ${activeTab === 'cadastrarDisciplina' ? 'show active' : ''}`} id="cadastrarDisciplina">
          <h1>Cadastrar Disciplina</h1>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="Digite o nome da Disciplina"
              value={novaDisciplina.nome}
              onChange={(e) => setNovaDisciplina({ ...novaDisciplina, nome: e.target.value })}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="idade">Carga Horária:</label>
            <input
              type="number"  // Defina o tipo como "number"
              id="idade"
              className="form-control"
              placeholder="Digite a Carga Horária:"
              value={novaDisciplina.cargaHoraria}
              onChange={(e) => setNovaDisciplina({ ...novaDisciplina, cargaHoraria: e.target.value })}
              pattern="[0-9]*"  // Permita apenas dígitos
            />
          </div>
          <button className="btn btn-primary mt-2 ml-auto" onClick={cadastrarDisciplina}>
            Cadastrar
          </button>
        </div>

        <div className={`tab-pane fade ${activeTab === 'listar' ? 'show active' : ''}`} id="listar">
          <h1>Listar Alunos</h1>
          <div className="form-group">
            <label htmlFor="pesquisa">Pesquisar Alunos:</label>
            <input
              type="text"
              id="pesquisa"
              className="form-control"
              placeholder="Digite o nome ou a idade para pesquisar"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
          </div>
          <ul>
            {alunos
              .filter((aluno) =>
                aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                aluno.idade.toString().includes(termoPesquisa)
              )
              .map((aluno) => (
                <li key={aluno._id}>{aluno.nome} - {aluno.idade} anos</li>
              ))}
          </ul>
        </div>

        <div className={`tab-pane fade ${activeTab === 'listarDisciplinas' ? 'show active' : ''}`} id="listarDisciplinas">
          <h1>Listar Disciplinas</h1>
          <div className="form-group">
            <label htmlFor="pesquisa">Pesquisar Disciplinas:</label>
            <input
              type="text"
              id="pesquisa"
              className="form-control"
              placeholder="Digite o nome ou a carga horária para pesquisar"
              value={termoPesquisaDisciplina}
              onChange={(e) => setTermoPesquisaDisciplina(e.target.value)}
            />
          </div>
          <ul>
            {disciplinas
              .filter((disciplina) =>
                disciplina.nome.toLowerCase().includes(termoPesquisaDisciplina.toLowerCase()) ||
                disciplina.cargaHoraria.toString().includes(termoPesquisaDisciplina)
              )
              .map((disciplina) => (
                <li key={disciplina._id}>{disciplina.nome} - {disciplina.cargaHoraria} horas</li>
              ))}
          </ul>
        </div>
      </div>
      <div className={`tab-pane fade ${activeTab === 'lancarNota' ? 'show active' : ''} custom-tab`} id="lancarNota" style={{ zIndex: 1 }}>
        <h1>Lançar Nota</h1>
        <div className="form-group">
          <label htmlFor="aluno">Selecione o Aluno:</label>
          <select
            id="aluno"
            className="form-control"
            value={alunoSelecionado}
            onChange={(e) => setAlunoSelecionado(e.target.value)}
          >
            <option value="">Selecione o Aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno._id} value={aluno._id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="disciplina">Selecione a Disciplina:</label>
          <select
            id="disciplina"
            className="form-control"
            value={disciplinaSelecionada}
            onChange={(e) => setDisciplinaSelecionada(e.target.value)}
          >
            <option value="">Selecione a Disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina._id} value={disciplina._id}>
                {disciplina.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nota">Informe a Nota:</label>
          <input
            type="number"
            id="nota"
            className="form-control"
            placeholder="Digite a nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            pattern="[0-9]*"
          />
        </div>
        <button className="btn btn-primary mt-2 ml-auto" onClick={lancarNota}>
          Lançar Nota
        </button>
      </div>
    </div>
  );
};

export default App;