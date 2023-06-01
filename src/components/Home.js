import React from "react";
import { Link } from "react-router-dom";
import Seasons from "./Seasons";

const Home = () => {
    return (
        <div className="news-wrap">
            {/* <h1>News</h1> */}
            <Seasons />
            <table className="news-container">
                <tbody>
                <tr>
                    <td >
                        <Link to="https://www.formula1.com/en/latest/article.crypto-com-overtake-of-the-month-award.4NSk8Aciia1hOZ9QEmmSjq.html" target="_blank">
                            <img src="https://media.formula1.com/image/upload/f_auto/q_auto/v1685306425/fom-website/manual/Misc/Crypto/Crypto-Nominations-MAY-169.png.transform/9col/image.png" alt="News img" />
                            <h3>News</h3>
                            <p>Crypto.com Overtake of the Month Award - Vote for your favourite move now!</p>
                        </Link>
                    </td>
                    <td >
                        <Link to="https://www.formula1.com/en/latest/article.highlights-relive-the-action-from-a-gripping-race-in-monaco-as-verstappen.2S4bbTHRc7xL8DHD3StQz7.html" target="_blank">
                            <img src="https://d2n9h2wits23hf.cloudfront.net/image/v1/static/6057949432001/0926b0ea-20b5-4242-a4cc-8250f6ca8739/4dab6f11-b2cd-460b-8e6a-cb18b493c422/1316x740/match/image.jpg" alt="News img" />
                            <h3>News</h3>
                            <p>HIGHLIGHTS: Relive the action from a gripping race in Monaco as Verstappen dominates to take victory</p>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td >
                        <Link to="https://www.formula1.com/en/latest/article.we-knew-this-was-the-price-we-were-going-to-pay-says-perez-after-quali-crash.IJsCgmucIUwnjogoI05te.html" target="_blank">
                            <img src="https://media.formula1.com/image/upload/v1685197676/trackside-images/2023/F1_Grand_Prix_of_Monaco___Qualifying/1493764941.jpg.transform/9col/image.jpg" alt="News img" />
                            <h3>News</h3>
                            <p>We knew this was the price we were going to pay’ says Perez after quali crash results in P16 finish in Monaco</p>
                        </Link>
                    </td>
                    <td >
                        <Link to="https://www.formula1.com/en/latest/article.monday-morning-debrief-would-alonso-have-won-in-monaco-if-hed-made-the-right.3QpWrt2oyb2PpbUdYAPWqq.html" target="_blank">
                            <img src="https://media.formula1.com/image/upload/f_auto/q_auto/v1685349308/fom-website/2023/Monaco/MMD%20-%20Monaco%202023.jpg.transform/9col/image.jpg" alt="News img" />
                            <h3>News</h3>
                            <p>MONDAY MORNING DEBRIEF: Would Alonso have won in Monaco if he'd made the right tyre call when the rain hit?</p>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td >
                        <Link to="https://www.formula1.com/en/latest/article.were-just-too-far-away-says-downbeat-leclerc-after-p6-finish-in-home-race.1djRDsbmQHpdfStKMGlSAh.html" target="_blank">
                            <img src="https://d2n9h2wits23hf.cloudfront.net/image/v1/static/6057949432001/83fdc33b-a888-4b37-b091-710faa7bf81b/e8b69ad9-8982-42f9-836c-d15e3aba939b/1316x740/match/image.jpg" alt="News img" />
                            <h3>News</h3>
                            <p>We’re just too far away’ says downbeat Leclerc after P6 finish in home race</p>
                        </Link>
                    </td>
                    <td>
                        <Link to="https://www.formula1.com/en/latest/article.were-going-to-get-there-wolff-convinced-mercedes-are-on-now-on-the-right.4gLlVpJWtAMOgw9qKhSzgX.html" target="_blank">
                            <img src="https://media.formula1.com/image/upload/f_auto/q_auto/v1685292605/trackside-images/2023/F1_Grand_Prix_of_Monaco/1494047233.jpg.transform/9col/image.jpg" alt="News img" />
                            <h3>News</h3>
                            <p>We’re just too far away’ says downbeat Leclerc after P6 finish in home race</p>
                        </Link>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Home;
