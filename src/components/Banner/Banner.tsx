import { useState } from 'react';
import { AdvantageItem } from '../AdvantageItem/AdvantageItem';
import { Button } from '../Button/Button';
import './Banner.css';


interface Props {
    title: string;
    text: string;
    advantages: string[];
}

const externalUrl = "https://finom.co";

export const Banner = ({title, text, advantages}: Props) => {
    const [isOpened, setOpened] = useState(true);
    const [isApplied, setApplied] = useState(false);
    const [isRendered, setIsRendered] = useState(true);

    const delayedRemoveFromDom = () => {
        // remove from DOM when animation complete
        setTimeout(() => setIsRendered(false), 1000);
    }

    const close = () => {
        setOpened(false);
        delayedRemoveFromDom();
    }

    const apply = () => {
        setApplied(true);
        setOpened(false);
        delayedRemoveFromDom();
    }

    return isRendered ? <div className={`overlay overlay--${isOpened ? 'opened' : 'closed'}`}>
        <section
            role="region"
            className={`banner banner--${isOpened ? 'opened' : 'closed'} banner--${isApplied ? 'applied' : 'not-applied'}`}
            aria-labelledby="banner-title" tabIndex={0}
        >
            <header>
                <h1 id="banner-title" className="banner__title">{title}</h1>
                <Button type="neutral" className="banner__close" onClick={close} />
            </header>
            <div className="content">
                <article className="content__col content__main">
                    {text}
                </article>
                <aside className="content__col content__advantages">
                    {advantages.map((text, idx) => (
                        <AdvantageItem key={idx}>{text}</AdvantageItem>
                    ))}
                </aside>
            </div>
            <div className="buttons">
                <Button type="primary" onClick={apply}>
                    Apply Now
                </Button>
                <Button type="ghost" onClick={() => window.open(externalUrl, '__blank')} aria-label="Go to more details (opens in new tab)">
                    More information
                </Button>
            </div>
        </section>
    </div> : null;
}