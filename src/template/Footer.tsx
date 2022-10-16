import Link from 'next/link';

import { Background } from '../background/Background';
import { FooterCompanyInfo } from '../footer/FooterCompanyInfo';
import { FooterLinks } from '../footer/FooterLinks';
import { FooterTwoRowsCopyright } from '../footer/FooterTwoRowsCopyright';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';
import { Logo } from './Logo';

const Footer = () => (
  <Background color="bg-gray-100">
    <Section>
      <FooterTwoRowsCopyright siteName={AppConfig.site_name}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
          <div className="col-span-1 sm:col-span-2">
            <FooterCompanyInfo
              logo={<Logo />}
              description={AppConfig.description}
            />
          </div>

          <FooterLinks title="Product">
            <li>
              <Link href="/">
                <a>First link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Second link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Third link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Forth link</a>
              </Link>
            </li>
          </FooterLinks>
          <FooterLinks title="Resources">
            <li>
              <Link href="/">
                <a>First link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Second link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Third link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Forth link</a>
              </Link>
            </li>
          </FooterLinks>
          <FooterLinks title="Contact">
            <li>
              <Link href="/">
                <a>First link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Second link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Third link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Forth link</a>
              </Link>
            </li>
          </FooterLinks>
          <FooterLinks title="Legal">
            <li>
              <Link href="/">
                <a>First link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Second link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Third link</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Forth link</a>
              </Link>
            </li>
          </FooterLinks>
        </div>
      </FooterTwoRowsCopyright>
    </Section>
  </Background>
);

export { Footer };
