import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Code como ferramenta de desenvolvimento | Guilherme Bertolo',
  description: 'Depois de meses usando Claude Code como IDE principal, o que realmente acelera e o que atrapalha. Setup real, patterns que funcionam e produtividade honesta.',
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: '0', maxWidth: 'none', margin: '0 0 3rem 0' }}>
      <h2 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '0', lineHeight: 1.3 }}>
        <span style={{ color: 'var(--c-accent)' }}>{number}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'var(--c-text-secondary)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>{children}</p>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.25rem', overflow: 'auto', marginBottom: '1.25rem', marginTop: '1.25rem', fontSize: '0.8rem', lineHeight: 1.7, fontFamily: 'var(--font-mono)', color: 'var(--c-text-secondary)' }}>
      <code>{children}</code>
    </pre>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: 'var(--c-text)', fontWeight: 600 }}>{children}</strong>;
}

export default function ArticlePage() {
  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />
      <header style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem 0', position: 'relative', zIndex: 1 }}>
        <Link
          href="/blog"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>&#8592;</span> Voltar ao blog
        </Link>
      </header>

      <article style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem 6rem', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {['AI', 'Claude Code', 'Produtividade'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid var(--c-border)', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1.25rem' }}>
            Claude Code como ferramenta de desenvolvimento
          </h1>
          <p style={{ color: 'var(--c-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Depois de meses usando no dia a dia, vou te contar o que realmente funciona e o que te faz perder tempo.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)' }}>
            7 abr 2026 · 8 min de leitura
          </div>
        </div>

        {/* Intro */}
        <P>
          Cara, todo mundo fala de IA pra código. &quot;Usa o Copilot&quot;, &quot;manda o ChatGPT fazer&quot;, &quot;Claude Code resolve&quot;. E resolve mesmo. Mas ninguem te conta o seguinte: entre usar IA pra codigo e usar <B>de verdade</B>, a diferenca toda ta na preparacao.
        </P>
        <P>
          Pensa em cozinhar. Qualquer pessoa liga o fogao. Mas separar os ingredientes antes, picar tudo, deixar na ordem certa... isso e o que separa um prato bem feito de uma bagunca. Eu uso Claude Code todo dia, em projeto real, coisa em producao. E o que eu aprendi e que 70% do resultado vem antes de voce digitar o primeiro prompt.
        </P>

        {/* Section 1 */}
        <Section number="01" title="O setup que faz diferença">
          <P>
            Voce ja abriu um projeto e cada arquivo parecia que foi escrito por uma pessoa diferente? Um usa camelCase, outro snake_case, um importa de um jeito, outro de outro. Uma zona total.
          </P>
          <P>
            O <B>CLAUDE.md</B>{' '}resolve isso. E um arquivo que fica na raiz do projeto e fala pro Claude Code: &quot;aqui a gente trabalha assim&quot;. Tipo quando voce entra numa empresa nova e alguem te passa o &quot;jeito da casa&quot;. So que pro agente de IA.
          </P>
          <P>
            No meu, eu coloco convencao de nomes (componentes em PascalCase, arquivos em kebab-case), ordem de imports, como tratar erros, formato de commits. Parece burocracia, mas e o contrario. Sem isso, cada resposta sai de um jeito. Com isso, o codigo sai padronizado desde a primeira linha.
          </P>
          <CodeBlock>{`Convenções de Nomenclatura:
- Componentes: PascalCase (WorkflowList)
- Hooks: prefixo use (useWorkflowOperations)
- Arquivos: kebab-case (workflow-list.tsx)
- Constantes: SCREAMING_SNAKE_CASE (MAX_RETRIES)

Imports: sempre absolutos com @/
import { useStore } from '@/stores/feature/store'  // certo
import { useStore } from '../../../stores/store'    // errado`}</CodeBlock>
          <P>
            Mas o CLAUDE.md sozinho nao da conta de tudo. Tem coisa que so faz sentido em contexto especifico. Pra isso existe a pasta <B>.claude/rules/</B>. Voce cria arquivos de regra dizendo em quais pastas ela se aplica. Regras de banco so carregam quando o Claude ta mexendo em migracao. Regras de CI/CD so aparecem na pasta de infraestrutura. Isso economiza contexto (que e limitado) e evita confusao.
          </P>
          <P>
            E tem os MCP servers. MCP e um protocolo que conecta o Claude a ferramentas externas. Eu uso Playwright pra testar interface no navegador, Context7 pra puxar documentacao atualizada de libs, e EXA pra pesquisa web. E tipo dar ferramentas extras pro Claude. Ele deixa de depender so do que sabe de cabeca.
          </P>
        </Section>

        {/* Section 2 */}
        <Section number="02" title="O que eu deixo a IA fazer (e o que nao deixo)">
          <P>
            Essa e a parte que mais gente erra. Bate uma vontade enorme de jogar tudo pro Claude e ir tomar cafe. &quot;Faz a arquitetura do sistema&quot;, &quot;decide qual banco usar&quot;. Nao. Isso e decisao sua.
          </P>
          <P>
            Pensa assim: a IA e tipo um mecanico muito rapido e habilidoso. Mas quem decide qual peca trocar e voce, que conhece o carro. Se voce pede pro mecanico decidir sozinho, ele ate troca. Mas pode colocar uma peca que nao aguenta a pressao.
          </P>
          <P>
            Eu tenho uma regra no meu setup chamada <B>&quot;No Invention&quot;</B> (sem invencao). Toda feature precisa apontar pra um requisito documentado. Se nao tem requisito, nao implementa. Sabe aquela historia? Voce pede um formulario de login e a IA volta com login, cadastro, recuperacao de senha, autenticacao por biometria e integracao com 3 redes sociais. Ninguem pediu isso.
          </P>
          <P>
            <B>Delego tranquilo:</B> implementacao quando a spec ta clara, testes unitarios, refatoracao com escopo definido, e tarefas repetitivas tipo gerar boilerplate.
          </P>
          <P>
            <B>Nunca delego:</B> modelagem de dados (a estrutura do banco define o destino do projeto), trade-offs de arquitetura (cada escolha tem consequencia), e seguranca (RLS, autenticacao, autorizacao). Essas decisoes precisam de contexto de negocio que a IA simplesmente nao tem.
          </P>
        </Section>

        {/* Section 3 */}
        <Section number="03" title="O que funciona de verdade">
          <P>
            <B>Story-driven.</B> Toda tarefa comeca com um documento. Nao e um prompt jogado no chat. E um arquivo com contexto, criterios de aceite, lista de arquivos. E tipo pedir comida por delivery: se voce fala so &quot;manda uma pizza&quot;, pode vir qualquer coisa. Se voce fala &quot;margherita, massa fina, sem azeitona, cortada em 8&quot;, chega o que voce quer. A story e o pedido detalhado.
          </P>
          <P>
            <B>Agent handoff com compactacao.</B> Uso agentes especializados: um pra criar, outro pra implementar, outro pra testar. Quando troco de agente, o sistema compacta o contexto anterior num resumo de ~379 tokens e passa so o essencial. Depois de duas trocas, o contexto usado e 57% menor. Sessoes mais longas, respostas mais precisas.
          </P>
          <P>
            <B>Quality gates automaticos.</B> Antes de qualquer push, roda lint (verificacao de estilo), typecheck (tipos do TypeScript), testes e revisao automatica. Falhou? Nao passa. Tipo catraca de metro. Sem bilhete, sem entrada.
          </P>
          <P>
            <B>Boundary protection.</B> Tenho regras que impedem o Claude de editar certos arquivos core. E tipo trancar o quadro de energia do predio. O eletricista mexe na fiacao do seu apartamento, mas no quadro geral so com autorizacao especial.
          </P>
        </Section>

        {/* Section 4 */}
        <Section number="04" title="O que nao funciona">
          <P>
            <B>Pedir sem explicar.</B> &quot;Faz um dashboard bonito.&quot; Bonito como? Com quais dados? Pra quem? Se o prompt e vago, o resultado e vago. Toda vez que tive retrabalho foi porque achei que &quot;tava obvio&quot;. Spoiler: nunca ta obvio.
          </P>
          <P>
            <B>Nao revisar codigo.</B> So porque compilou e passou nos testes nao quer dizer que ta certo. A IA adora criar abstracao desnecessaria. Faz um wrapper em cima de wrapper em cima de outro wrapper. Compila? Compila. Funciona? Funciona. Mas ninguem vai entender isso daqui 3 meses.
          </P>
          <P>
            <B>Sessoes longas sem compactar.</B> O Claude Code tem uma janela de contexto limitada. Conforme a conversa cresce, as coisas do inicio ficam &quot;borradas&quot;. E tipo sua mesa de trabalho: se voce nao organiza, uma hora nao acha mais nada. O /compact resolve. Eu uso a cada 30-40 minutos.
          </P>
          <P>
            <B>Pedir opiniao.</B> &quot;O que voce acha de usar Redis aqui?&quot; e convite pra resposta generica. &quot;Implementa cache com Redis seguindo esse padrao&quot; e instrucao clara. A IA funciona muito melhor como executor do que como consultor.
          </P>
        </Section>

        {/* Section 5 */}
        <Section number="05" title="A produtividade real">
          <P>
            Se alguem te falar que IA da ganho de 10x, desconfia. No meu caso, com setup maduro e meses de refinamento, o ganho fica entre <B>2x e 3x</B>. E olha, 2x ja e absurdo. E entregar em uma semana o que antes levava duas.
          </P>
          <P>
            Mas esse 2-3x nao vem de graca. Vem do CLAUDE.md bem escrito. Das regras organizadas. Das stories detalhadas. Dos quality gates. De voce saber o que delegar e o que decidir sozinho.
          </P>
          <P>
            Pensa numa furadeira boa. Ferramenta potente, faz furo perfeito em qualquer material. Mas se voce nao sabe escolher a broca certa, nao marca o ponto antes, o resultado e um buraco torto feito muito rapido.
          </P>
          <P>
            Claude Code e a furadeira. Voce e quem segura. O CLAUDE.md e o manual. As stories sao as marcacoes na parede. Os quality gates sao o nivel de bolha. Tira qualquer peca dessa e o resultado cai.
          </P>
          <P>
            A ferramenta e poderosa. Mas ferramenta poderosa na mao de quem nao se preparou e so uma forma mais rapida de fazer besteira. O segredo nao e o prompt. E tudo que vem antes dele.
          </P>
        </Section>

        {/* CTA */}
        <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '2rem', marginTop: '1rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Quer ver como eu aplico isso no dia a dia? Da uma olhada nos meus projetos.
          </p>
          <Link
            href="/#projetos"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'white', textDecoration: 'none', background: 'var(--c-accent)', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 500 }}
          >
            Ver projetos
          </Link>
        </div>
      </article>
    </div>
  );
}
