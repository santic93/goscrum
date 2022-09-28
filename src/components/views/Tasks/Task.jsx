import './Task.styles.css';
import { useResize } from '../../../hooks/useResize';
import { Header } from '../../Header/Header';
import { cardsData } from './data';
import Card from '../../Card/Card';

export const Task = () => {
  const { isPhone } = useResize();
  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat('...'), addButton: true };
      return { string: str, addButton: false };
    }
  };
  const renderAllCards = () => {
    return cardsData.map((data) => <Card key={data.id} data={data} />);
  };
  return (
    <>
      <Header />
      <main id='tasks'>
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            <div className='list phone'>{renderAllCards()}</div>
          ) : (
            <div className='list_group'>
              <div className='list'>
                <h4>Nuevas</h4>
                <div className='card'>
                  <div className='close'>X</div>
                  <h3>Tarea 3</h3>
                  <h6>24/1/2022 16:40hrs.</h6>
                  <h5>Santiago Castro</h5>
                  <button type='button'>Nueva</button>
                  <button type='button'>Alta</button>
                  <p>Descripcion Fake </p>
                </div>
              </div>
              <div className='list '>
                <h4>En Proceso</h4>
                <div className='card'>
                  <div className='close'>X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 16:40hrs.</h6>
                  <h5>Santiago Castro</h5>
                  <button type='button'>Nueva</button>
                  <button type='button'>Alta</button>
                  <p>Descripcion Fake </p>
                </div>
              </div>
              <div className='list'>
                <h4>Finalizadas</h4>
                <div className='card'>
                  <div className='close'>X</div>
                  <h3>Tarea 3</h3>
                  <h6>24/1/2022 16:40hrs.</h6>
                  <h5>Santiago Castro</h5>
                  <button type='button'>Nueva</button>
                  <button type='button'>Alta</button>
                  <p>
                    {
                      limitString(
                        `Cattt catt cattty cat being a cat in the middle of the night i crawl onto your chest and purr gently to help you sleep poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree. Scratch the box paw at your fat belly but caticus cuteicus, meow. Chase little red dot someday it will be mine! carefully drink from water glass and then spill it everywhere and proceed to lick the puddle for human is behind a closed door, emergency! abandoned! meeooowwww!!!. See owner, run in terror. Cat milk copy park pee walk owner escape bored tired cage droppings sick vet vomit meoooow. Pee in the shoe. What a cat-ass-trophy! pee in the shoe hiss and stare at nothing then run suddenly away hiss and stare at nothing then run suddenly away, meow all night having their mate disturbing sleeping humans`
                      ).str
                    }{' '}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
