const SLIDES = [
  { loc: 'Narok County, Kenya', t: 'Maasai Mara', a: '#c9822b', b: '#3b2412' },
  { loc: 'Indian Ocean, Tanzania', t: 'Zanzibar Island', a: '#2fa7b8', b: '#0b3340' },
  { loc: 'Namib Desert, Namibia', t: 'Sossusvlei Dunes', a: '#d2562b', b: '#3a1409' },
];

export function SafariDemo({ play }) {
  return (
    <div className={`dm dm-safari ${play ? 'play' : ''}`}>
      {SLIDES.map((s, i) => (
        <div key={s.t} className="sl" style={{ '--a': s.a, '--b': s.b, '--n': i }}>
          <div className="sl-copy">
            <p className="sl-loc">
              <b />
              {s.loc}
            </p>
            <h4>{s.t}</h4>
            <div className="bars">
              <i />
              <i />
            </div>
            <div className="sl-btns">
              <span className="p1">Discover location</span>
              <span className="p2">Plan your visit</span>
            </div>
          </div>
        </div>
      ))}
      <div className="sl-brand">
        <i>S</i>Safari Atlas
      </div>
      <div className="sl-cards">
        {SLIDES.map((s, i) => (
          <span key={s.t} className="mc" style={{ '--a': s.a, '--b': s.b, '--n': i }} />
        ))}
      </div>
    </div>
  );
}

export function NailDemo({ play }) {
  return (
    <div className={`dm dm-nail ${play ? 'play' : ''}`}>
      <div className="top">Gloss Nail Studio</div>
      <div className="st s1">
        <h5>Choose a service</h5>
        <ul>
          <li>Gel manicure</li>
          <li className="pk">Classic pedicure</li>
          <li>Nail art</li>
        </ul>
      </div>
      <div className="st s2">
        <h5>Pick a day and time</h5>
        <div className="chips days">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span className="pk">Thu</span>
          <span>Fri</span>
        </div>
        <div className="chips times">
          <span>09:00</span>
          <span className="pk2">10:30</span>
          <span>14:00</span>
        </div>
        <div className="btn">Confirm booking</div>
      </div>
      <div className="st s3">
        <div className="chk">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h5>You are booked</h5>
        <div className="bubble">
          <small>WhatsApp alert to the owner</small>
          New booking: Classic pedicure, Thu 10:30
        </div>
      </div>
      <div className="dots">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function BakeDemo({ play }) {
  return (
    <div className={`dm dm-bake ${play ? 'play' : ''}`}>
      <div className="top">
        <b>Hearth and Honey</b>
        <span className="cart">
          Order
          <span className="cnt">
            <em className="c0">0</em>
            <em className="c1">1</em>
            <em className="c2">2</em>
          </span>
        </span>
      </div>
      <div className="st s1">
        <h5>Fresh today</h5>
        <div className="it">
          <span>Sourdough loaf</span>
          <span className="add a1">
            <u className="t1">Add</u>
            <u className="t2">Added</u>
          </span>
        </div>
        <div className="it">
          <span>Honey cake</span>
          <span className="add a2">
            <u className="t1">Add</u>
            <u className="t2">Added</u>
          </span>
        </div>
        <div className="it">
          <span>Butter croissants</span>
          <span className="add">
            <u className="t1">Add</u>
          </span>
        </div>
      </div>
      <div className="st s2">
        <h5>Your order</h5>
        <div className="line">1 Sourdough loaf</div>
        <div className="line">1 Honey cake</div>
        <div className="wa">Send order on WhatsApp</div>
      </div>
      <div className="st s3">
        <div className="chat">
          <div className="msg">Hi Hearth and Honey, I would like 1 Sourdough loaf and 1 Honey cake.</div>
          <small>Sent</small>
        </div>
      </div>
      <div className="dots">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
