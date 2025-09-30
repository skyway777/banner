import { useCallback, useEffect, useRef, useState } from 'react';
import { AdvantageItem } from '../AdvantageItem/AdvantageItem';
import { Button } from '../Button/Button';
import './Banner.css';


interface Props {
    title: string;
    text: string;
    advantages: string[];
}

const externalUrl = "https://finom.co";

const getBannerClasses = (isOpened:boolean, isApplied:boolean) => {
    const opened =`banner--${isOpened ? 'opened' : 'closed'}`;
    const applied = `banner--${isApplied ? 'applied' : 'not-applied'}`;
    return `banner ${opened} ${applied}`;
}

export const Banner = ({title, text, advantages}: Props) => {
    const [isOpened, setOpened] = useState(true);
    const [isApplied, setApplied] = useState(false);
    const [isRendered, setIsRendered] = useState(true);
    const bannerRef = useRef<HTMLDivElement | null>(null);

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

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            } else if (event.key === 'Enter' && document.activeElement === bannerRef.current) {
                apply();
            }
        },
        []
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return isRendered ? <div className={`overlay overlay--${isOpened ? 'opened' : 'closed'}`}>
        <section
            role="region"
            className={getBannerClasses(isOpened, isApplied)}
            aria-labelledby="banner-title"
            tabIndex={1}
            ref={bannerRef}
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