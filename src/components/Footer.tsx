const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        Made with React(useContext) and Typescript, by{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://twitter.com/MaxCodeJourney'
        >
          Maxi Ruti,
        </a>{' '}
        {new Date().getFullYear()}
      </p>
      <p>
        Visit my other projects{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://my-portfolio-blog-website.netlify.app/'
        >
          My Portfolio Website
        </a>
      </p>
    </footer>
  );
};

export default Footer;
