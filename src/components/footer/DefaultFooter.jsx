import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_serviceList } from "../../data/D_footer";
import { D_navList } from "../../data/D_header";

export default function DefaultFooter() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MdefaultFooterBox>
        <section className="innerSec">
          <ul className="navList contCont contList">
            {D_navList.map((v, i) => (
              <li key={i}>{v.text}</li>
            ))}
          </ul>

          <ul className="serviceList contCont contList">
            {D_serviceList.map((v, i) => (
              <li key={i}>{v.text}</li>
            ))}
          </ul>
        </section>
      </MdefaultFooterBox>
    );
  else
    return (
      <PdefaultFooterBox>
        <section className="innerSec">
          <article className="leftArea">
            <ul className="navList contCont contList">
              {D_navList.map((v, i) => (
                <li key={i}>{v.text}</li>
              ))}
            </ul>

            <ul className="serviceList contCont contList">
              {D_serviceList.map((v, i) => (
                <li key={i}>{v.text}</li>
              ))}
            </ul>

            <ul className="infoList contCont contList">
              <li>Email : test@test.com</li>
              <li>Phone : +00 0000-0000</li>
            </ul>
          </article>
        </section>
      </PdefaultFooterBox>
    );
}

const MdefaultFooterBox = styled.footer`
  padding: 60px 20px;
  font-size: 14px;
  color: #929294;
  background: #eaeef3;

  .innerSec {
    display: flex;

    .contCont {
      flex: 1;
    }

    .contList {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .navList {
      font-weight: 500;
      color: #929294;
    }
  }
`;

const PdefaultFooterBox = styled.footer`
  display: flex;
  justify-content: center;
  padding: 100px 0;
  font-size: 14px;
  color: #aaa;
  background: #000;

  .innerSec {
    width: 1280px;

    .leftArea {
      display: flex;

      .contCont {
        width: 280px;
      }

      .contList {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .navList {
        font-weight: 500;
        color: #fff;
      }
    }
  }
`;
