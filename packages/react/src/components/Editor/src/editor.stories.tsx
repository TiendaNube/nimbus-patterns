import type { Meta, StoryObj } from "@storybook/react";
import { Editor } from "./Editor";

const meta: Meta<typeof Editor> = {
  title: "Patterns/Editor",
  component: Editor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Basic: Story = {
  args: {
    value:
      '<p>Somos uma&nbsp;<strong>transportadora</strong>&nbsp;diferente de todas que a sua loja j&aacute; usou! A ASAP Log &eacute; 100% focada em e-commerce, com tecnologia desenvolvida para tornar frete uma solu&ccedil;&atilde;o para que vende online. <strong><a href="https://asaplog.com.br/area-de-atuacao/">Clique e veja</a></strong>&nbsp;se nosso servi&ccedil;o est&aacute;&nbsp;dispon&iacute;vel&nbsp;em sua regi&atilde;o.<br><br>Sabemos que vender por canais digitais n&atilde;o &eacute; f&aacute;cil. O frete tem grande impacto na decis&atilde;o e experi&ecirc;ncia de compra online. E oferecemos&nbsp;um frete competitivo e a tecnologia que as lojas e os consumidores merecem.<br><br>Aplicamos toda nossa expertise diariamente, movidos pelo desafio e a vontade de oferecer a melhor experi&ecirc;ncia com entrega.&nbsp;</p><p>Ofere&ccedil;a fretes mais competitivos com poucos cliques,&nbsp;<span style="color:rgb(3,49,99);"><strong>Frete baixo aumenta vendas!</strong></span></p><h3><span style="color:#033163;"><strong>Vantagens</strong></span></h3><ul><li><p>Fretes mais baratos</p></li><li><p>Coleta&nbsp;gratuita</p></li><li><p>Sem cobran&ccedil;a de mensalidade</p></li></ul><h3><span style="color:#033163;"><strong>Melhore seus indicadores</strong></span></h3><ul><li><p>- Abandono de carrinho</p></li><li><p>+ Taxa de convers&atilde;o</p></li><li><p>+ Recorr&ecirc;ncia</p></li></ul>',
    parser: "html",
  },
};
