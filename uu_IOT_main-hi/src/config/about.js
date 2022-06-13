import Uu5Elements from "uu5g05-elements";

const About = {
  about: {
    cs: "Demo aplikace je šablona pro vývoj nových aplikací.",
    en: "Demo application is a template for developing new applications.",
  },
  licence: {
    termsOfUse: "https://unicorn.com/tou/your_product",
    organisation: {
      cs: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
      en: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
    },
    authorities: {
      cs: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
      en: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
    },
  },
  leadingAuthors: [
    {
      name: "Some Name",
      uuIdentity: "4-4-1",
      role: {
        en: "Chief Business Architect & Stakeholder",
      },
    },
    {
      name: "Other Name",
      uuIdentity: "4-4-1",
      role: {
        en: "Head of Development",
      },
    },
  ],
  otherAuthors: [
    {
      name: "Your Name",
      uuIdentity: "4-4-1",
      role: {
        en: "Developer",
      },
    },
    {
      name: "More Names",
      uuIdentity: "4-4-1",
      role: {
        en: "Developer",
      },
    },
  ],
  usedTechnologies: {
    technologies: {
      en: [
        <Uu5Elements.Link key="uaf" href="https://docs.plus4u.net/uaf" target="_blank">
          UAF
        </Uu5Elements.Link>,
        <Uu5Elements.Link key="uuapp" href="https://docs.plus4u.net/uaf/uuapp" target="_blank">
          uuApp
        </Uu5Elements.Link>,
        <Uu5Elements.Link key="uu5" href="https://docs.plus4u.net/uaf/uuapp/uu5" target="_blank">
          uu5
        </Uu5Elements.Link>,
        <Uu5Elements.Link key="uuplus4u5" href="https://docs.plus4u.net/uaf/uuapp/plus4u5" target="_blank">
          uuPlus4U5
        </Uu5Elements.Link>,
        <Uu5Elements.Link
          key="uuproductcatalogue"
          href="https://uuapp.plus4u.net/uu-bookkit-maing01/7f743efd1bf6486d8e72b27a0df92ba7/book"
          target="_blank"
        >
          uuProductCatalogue
        </Uu5Elements.Link>,
        <Uu5Elements.Link key="uuappserver" href="https://docs.plus4u.net/uaf/uuapp/uuappserver" target="_blank">
          uuAppServer
        </Uu5Elements.Link>,
        <Uu5Elements.Link
          key="uuoidc"
          href="https://uuapp.plus4u.net/uu-bookkit-maing01/d684156f06004f2781c88777e74834ef"
          target="_blank"
        >
          uuOIDC
        </Uu5Elements.Link>,
        <Uu5Elements.Link key="uucloud" href="https://docs.plus4u.net/uaf/uuapp/uucloud" target="_blank">
          uuCloud
        </Uu5Elements.Link>,
      ],
    },
    content: {
      cs: [
        `<uu5string/>Dále byly použity technologie: <Uu5Elements.Link href="http://www.w3schools.com/html/default.asp" target="_blank">Html5</Uu5Elements.Link>, <Uu5Elements.Link href="http://www.w3schools.com/css/default.asp" target="_blank">CSS</Uu5Elements.Link>, <Uu5Elements.Link href="http://www.w3schools.com/js/default.asp" target="_blank">JavaScript</Uu5Elements.Link>, <Uu5Elements.Link href="http://getbootstrap.com" target="_blank">Bootstrap</Uu5Elements.Link>,
        <Uu5Elements.Link href="https://reactjs.org" target="_blank">React</Uu5Elements.Link>, <Uu5Elements.Link href="https://www.ruby-lang.org" target="_blank">Ruby</Uu5Elements.Link>, <Uu5Elements.Link href="http://puma.io" target="_blank">Puma</Uu5Elements.Link> a <Uu5Elements.Link href="https://www.docker.com" target="_blank">Docker</Uu5Elements.Link>.
        Aplikace je provozována v rámci internetové služby <Uu5Elements.Link href="https://plus4u.net" target="_blank">Plus4U</Uu5Elements.Link> s využitím cloudu <Uu5Elements.Link href="https://azure.microsoft.com" target="_blank">Microsoft Azure</Uu5Elements.Link>.`,
      ],
      en: [
        `<uu5string/>Other used technologies: <Uu5Elements.Link href="http://www.w3schools.com/html/default.asp" target="_blank">Html5</Uu5Elements.Link>, <Uu5Elements.Link href="http://www.w3schools.com/css/default.asp" target="_blank">CSS</Uu5Elements.Link>, <Uu5Elements.Link href="http://www.w3schools.com/js/default.asp" target="_blank">JavaScript</Uu5Elements.Link>, <Uu5Elements.Link href="http://getbootstrap.com" target="_blank">Bootstrap</Uu5Elements.Link>,
        <Uu5Elements.Link href="https://reactjs.org" target="_blank">React</Uu5Elements.Link>, <Uu5Elements.Link href="https://www.ruby-lang.org" target="_blank">Ruby</Uu5Elements.Link>, <Uu5Elements.Link href="http://puma.io" target="_blank">Puma</Uu5Elements.Link> a <Uu5Elements.Link href="https://www.docker.com" target="_blank">Docker</Uu5Elements.Link>.
        Application is operated in the <Uu5Elements.Link href="https://plus4u.net" target="_blank">Plus4U</Uu5Elements.Link> internet service with the usage of <Uu5Elements.Link href="https://azure.microsoft.com" target="_blank">Microsoft Azure</Uu5Elements.Link> cloud.`,
      ],
    },
  },
};

export { About };
export default About;
