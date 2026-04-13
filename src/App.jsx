import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Download, Dumbbell, PlayCircle, Search, Star, TimerReset, TrendingUp, Heart, BarChart3, Trash2, Plus, Minus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const STORAGE_KEY = 'mi-entreno-pro-v1';
const plan = {
  'Día 1': [
    ['Press banca','Pecho','3x6-8',90,'press banca tecnica','Túmbate en el banco, pies firmes, baja la barra al pecho con control y empuja arriba.',['Escápulas retraídas','No rebotes'],['Multipower','Press mancuernas']],
    ['Remo en polea','Espalda','3x8-10',90,'remo en polea tecnica','Tira del agarre hacia el abdomen con pecho alto y vuelve controlando.',['No balancees el tronco'],['Remo mancuerna','Remo máquina']],
    ['Press inclinado con mancuernas','Pecho superior','2x8-12',90,'press inclinado mancuernas tecnica','Sube las mancuernas sobre el pecho y baja con control.',['No abras demasiado los codos'],['Press inclinado multipower']],
    ['Jalón al pecho','Espalda','2x10-12',90,'jalon al pecho tecnica','Baja la barra al pecho llevando codos abajo.',['No uses impulso'],['Dominada asistida']],
    ['Elevaciones laterales','Hombro','2x12-15',60,'elevaciones laterales tecnica','Sube los brazos lateralmente hasta el hombro y baja lento.',['Sin balanceo'],['Polea unilateral']],
    ['Tríceps en polea','Tríceps','2x10-15',60,'triceps polea tecnica','Empuja hacia abajo con codos pegados.',['Codos quietos'],['Cuerda','Barra recta']]
  ],
  'Día 2': [
    ['Prensa','Pierna','3x8-12',120,'prensa de piernas tecnica','Baja la plataforma con control y empuja sin bloquear fuerte.',['Rodillas alineadas'],['Sentadilla goblet']],
    ['Sentadilla en multipower','Cuádriceps','2x8-10',120,'sentadilla multipower tecnica','Baja al rango cómodo y sube empujando el suelo.',['Espalda firme'],['Prensa pies bajos']],
    ['Extensión de cuádriceps','Cuádriceps','2-3x12-15',75,'extension cuadriceps tecnica','Extiende las piernas y baja lento.',['Pausa arriba'],['Step-up']],
    ['Femoral sentado','Femoral','2x10-15',75,'femoral sentado tecnica','Flexiona las rodillas y vuelve controlando.',['Sin tirones'],['Femoral de pie']],
    ['Gemelos','Gemelos','3x10-15',60,'gemelos maquina tecnica','Eleva talones, pausa arriba y baja lento.',['Recorrido completo'],['Gemelo unilateral']],
    ['Abdominales en máquina','Core','2x12-15',60,'abdominales maquina tecnica','Flexiona el tronco llevando costillas hacia pelvis.',['No tires del cuello'],['Crunch polea']]
  ],
  'Día 3': [
    ['Jalón al pecho','Espalda','3x8-12',90,'jalon al pecho tecnica','Baja la barra al pecho con control.',['Pecho arriba'],['Dominada asistida']],
    ['Press militar con mancuernas','Hombro','3x6-10',120,'press militar mancuernas tecnica','Empuja desde hombros hacia arriba y baja con control.',['Aprieta abdomen'],['Press multipower']],
    ['Remo máquina','Espalda','2x8-12',90,'remo maquina tecnica','Tira hacia el torso juntando escápulas.',['Controla la vuelta'],['Remo polea']],
    ['Face pull','Deltoide posterior','2x12-15',60,'face pull tecnica','Tira de la cuerda hacia la cara.',['No cargues demasiado'],['Pájaros']],
    ['Curl bíceps','Bíceps','2x10-15',60,'curl biceps tecnica','Flexiona el codo sin balancearte.',['Codos quietos'],['Curl polea']],
    ['Tríceps polea','Tríceps','2x10-15',60,'triceps polea tecnica','Empuja hacia abajo manteniendo codos pegados.',['Sin usar el cuerpo'],['Overhead rope']]
  ],
  'Día 4': [
    ['Hip thrust máquina','Glúteo','3x8-12',120,'hip thrust maquina tecnica','Empuja con talones y eleva la cadera.',['Aprieta glúteos arriba'],['Puente con barra']],
    ['Peso muerto rumano','Femoral/Glúteo','3x6-10',120,'peso muerto rumano tecnica','Lleva la cadera atrás con espalda neutra y sube apretando glúteos.',['Barra cerca del cuerpo'],['Rumano mancuernas']],
    ['Femoral de pie','Femoral','2x10-15',75,'femoral de pie tecnica','Lleva el talón al glúteo y baja lento.',['Movimiento controlado'],['Femoral sentado']],
    ['Zancada búlgara','Pierna','2x8-12 por pierna',90,'zancada bulgara tecnica','Baja con control y sube con la pierna delantera.',['Rodilla alineada'],['Split squat']],
    ['Lumbares máquina','Lumbar','2x12-15',60,'extension lumbar maquina tecnica','Extiende hasta posición neutra sin pasarte.',['No hiperextiendas'],['Bird-dog']],
    ['Core / plancha','Core','2 series',45,'plancha abdominal tecnica','Mantén cuerpo alineado apretando abdomen y glúteos.',['Cuello neutro'],['Pallof press']]
  ],
  'Día 5': [
    ['Press inclinado','Pecho','3x8-12',90,'press inclinado tecnica','Empuja desde inclinación moderada y baja con control.',['Escápulas firmes'],['Press inclinado mancuernas']],
    ['Remo polea','Espalda','3x8-12',90,'remo polea tecnica','Tira al abdomen con pecho arriba.',['Sin balanceo'],['Remo máquina']],
    ['Elevaciones laterales','Hombro','2x12-20',60,'elevaciones laterales tecnica','Sube lateralmente hasta el hombro.',['Control total'],['Polea unilateral']],
    ['Pájaros / deltoide posterior','Hombro posterior','2x12-20',60,'pajaros deltoide posterior tecnica','Abre brazos sin encoger trapecios.',['Ligero peso'],['Face pull']],
    ['Curl martillo','Bíceps','2x10-15',60,'curl martillo tecnica','Flexiona codos con agarre neutro.',['Sin balanceo'],['Curl cuerda']],
    ['Curl en polea','Bíceps','1-2x10-15',60,'curl polea tecnica','Flexiona codos sin mover hombros.',['Controla el recorrido'],['Curl barra']],
    ['Tríceps cuerda','Tríceps','2-3x10-15',60,'triceps cuerda tecnica','Empuja la cuerda hacia abajo y separa puntas al final.',['Aprieta abajo'],['Barra recta']]
  ]
};

const today = () => new Date().toISOString().slice(0,10);
const emptyState = () => ({ logsByDate:{}, notesByDate:{}, bodyWeightByDate:{}, favorites:{}, customSubs:{} });
const num = (v='') => { const m = String(v).replace(',','.').match(/\d+(\.\d+)?/); return m ? Number(m[0]) : 0; };
const get1RM = (weight,reps) => { const w = num(weight); const m = String(reps||'').match(/\d+/); const r = m ? Number(m[0]) : 0; return w && r ? Math.round(w*(1+r/30)*10)/10 : 0; };
const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

export default function App(){
  const [state,setState] = useState(emptyState);
  const [selectedDay,setSelectedDay] = useState('Día 1');
  const [selectedDate,setSelectedDate] = useState(today());
  const [search,setSearch] = useState('');
  const [timer,setTimer] = useState(90);
  const [running,setRunning] = useState(false);

  useEffect(()=>{ const raw = localStorage.getItem(STORAGE_KEY); if(raw){ try{ setState({...emptyState(), ...JSON.parse(raw)});}catch{} } },[]);
  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); },[state]);
  useEffect(()=>{
    if(!running) return;
    const id = setInterval(()=>{
      setTimer(t => {
        if(t<=1){ setRunning(false); return 0; }
        return t-1;
      });
    },1000);
    return ()=>clearInterval(id);
  },[running]);

  const filteredPlan = useMemo(()=>{
    const q = search.trim().toLowerCase();
    if(!q) return plan;
    const out = {};
    Object.entries(plan).forEach(([day, arr])=>{
      const rows = arr.filter(([name,muscle]) => name.toLowerCase().includes(q) || muscle.toLowerCase().includes(q));
      if(rows.length) out[day]=rows;
    });
    return out;
  },[search]);

  const days = Object.keys(filteredPlan);
  useEffect(()=>{ if(!days.includes(selectedDay) && days.length) setSelectedDay(days[0]); },[days, selectedDay]);

  const entry = (day, name) => state.logsByDate?.[selectedDate]?.[day]?.[name] || { weight:'', reps:'', notes:'' };
  const prevEntry = (day, name) => {
    const dates = Object.keys(state.logsByDate).filter(d=>d<selectedDate).sort().reverse();
    for(const d of dates){ const e = state.logsByDate[d]?.[day]?.[name]; if(e && (e.weight||e.reps||e.notes)) return { date:d, ...e }; }
    return null;
  };

  const setLog = (day,name,key,val) => setState(prev=>({
    ...prev,
    logsByDate:{
      ...prev.logsByDate,
      [selectedDate]:{
        ...prev.logsByDate[selectedDate],
        [day]:{
          ...(prev.logsByDate[selectedDate]?.[day]||{}),
          [name]:{
            ...(prev.logsByDate[selectedDate]?.[day]?.[name]||{weight:'',reps:'',notes:''}),
            [key]: val
          }
        }
      }
    }
  }));

  const favorites = Object.entries(plan).flatMap(([day, arr]) => arr.map(([name,muscle,series,rest,video,how,tips,subs])=>({day,name,muscle,series,rest,video,how,tips,subs}))).filter(x=>state.favorites[x.name]);
  const chartData = favorites[0] ? Object.keys(state.logsByDate).sort().map(date=>{
    const e = state.logsByDate[date]?.[favorites[0].day]?.[favorites[0].name];
    return e ? { date: date.slice(5), weight: num(e.weight), oneRM: get1RM(e.weight, e.reps) } : null;
  }).filter(Boolean) : [];

  const completedCount = Object.values(state.logsByDate?.[selectedDate]?.[selectedDay] || {}).filter(v=>v.weight||v.reps||v.notes).length;

  return <div className="app">
    <div className="header">
      <div>
        <div className="titleWrap"><Dumbbell size={26}/><h1>Mi Entreno Pro</h1></div>
        <div className="subtitle">App lista para registrar entrenos, progreso, descansos y vídeos de técnica.</div>
      </div>
      <div className="topControls">
        <input className="input" type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} style={{width:170}}/>
        <button className="btn" onClick={()=>{
          const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
          const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='mi-entreno-pro-datos.json'; a.click(); URL.revokeObjectURL(url);
        }}><Download size={16} style={{verticalAlign:'middle', marginRight:6}}/>Exportar</button>
        <button className="btn danger" onClick={()=>{ const s = emptyState(); setState(s); localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }}><Trash2 size={16} style={{verticalAlign:'middle', marginRight:6}}/>Borrar</button>
      </div>
    </div>

    <div className="layout">
      <div className="sidebar">
        <div className="card"><div className="cardHead"><h2><Search size={18} style={{verticalAlign:'middle', marginRight:6}}/>Buscar ejercicio</h2></div><div className="cardBody">
          <input className="input" placeholder="Ej: press, femoral, bíceps..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <div className="dayList" style={{marginTop:12}}>{Object.keys(plan).map(day=><button key={day} className={`btn dayBtn ${selectedDay===day?'active':''}`} onClick={()=>setSelectedDay(day)}><CalendarDays size={16} style={{verticalAlign:'middle', marginRight:6}}/>{day}</button>)}</div>
          <div className="infoBox" style={{marginTop:12}}>
            <div><strong>Fecha:</strong> {selectedDate}</div>
            <div><strong>Día actual:</strong> {selectedDay}</div>
            <div><strong>Ejercicios con datos:</strong> {completedCount}</div>
          </div>
        </div></div>

        <div className="card"><div className="cardHead"><h2><TimerReset size={18} style={{verticalAlign:'middle', marginRight:6}}/>Cronómetro de descanso</h2></div><div className="cardBody">
          <div className="timerValue">{fmt(timer)}</div>
          <div className="btnRow" style={{justifyContent:'center', marginTop:8}}>
            <button className="btn" onClick={()=>setTimer(t=>Math.max(0,t-15))}><Minus size={16}/></button>
            <button className="btn" onClick={()=>setTimer(t=>t+15)}><Plus size={16}/></button>
          </div>
          <div className="btnRow" style={{marginTop:10}}>
            <button className="btn primary" onClick={()=>setRunning(v=>!v)}>{running ? 'Pausar' : 'Iniciar'}</button>
            <button className="btn" onClick={()=>{setRunning(false); setTimer(90);}}>Reset 90 s</button>
          </div>
        </div></div>

        <div className="card"><div className="cardHead"><h2><Heart size={18} style={{verticalAlign:'middle', marginRight:6}}/>Peso corporal del día</h2></div><div className="cardBody">
          <input className="input" placeholder="Ej: 82.4 kg" value={state.bodyWeightByDate[selectedDate] || ''} onChange={e=>setState(prev=>({...prev, bodyWeightByDate:{...prev.bodyWeightByDate, [selectedDate]: e.target.value}}))}/>
        </div></div>

        <div className="card"><div className="cardHead"><h2><TrendingUp size={18} style={{verticalAlign:'middle', marginRight:6}}/>Progreso rápido</h2></div><div className="cardBody">
          {!favorites.length ? <div className="muted">Marca ejercicios como favoritos para ver aquí su progreso.</div> : favorites.slice(0,6).map(f=>{
            const cur = entry(f.day,f.name); const prev = prevEntry(f.day,f.name); const diff = num(cur.weight)-num(prev?.weight||0);
            return <div key={f.name} className="metric" style={{marginBottom:8}}>
              <div style={{fontWeight:700}}>{f.name}</div>
              <div className="muted">Actual: {cur.weight || '-'} | Anterior: {prev?.weight || '-'}</div>
              <div className={diff>0?'progressGood':diff<0?'progressWarn':'progressFlat'}>{diff>0?`+${diff} kg`:diff<0?`${diff} kg`:'Sin cambio'}</div>
            </div>
          })}
        </div></div>
      </div>

      <div className="main">
        {favorites[0] && <div className="card"><div className="cardHead"><h2><BarChart3 size={18} style={{verticalAlign:'middle', marginRight:6}}/>Gráfico de progreso: {favorites[0].name}</h2></div><div className="cardBody"><div className="chartBox"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="weight" strokeWidth={2} dot/><Line type="monotone" dataKey="oneRM" strokeWidth={2} dot/></LineChart></ResponsiveContainer></div></div></div>}

        <div className="tabs">{days.map(day=><button key={day} className={`btn tab ${selectedDay===day?'active':''}`} onClick={()=>setSelectedDay(day)}>{day}</button>)}</div>

        {(filteredPlan[selectedDay] || []).map(([name,muscle,series,rest,video,how,tips,subs])=>{
          const cur = entry(selectedDay,name); const prev = prevEntry(selectedDay,name); const diff = num(cur.weight)-num(prev?.weight||0); const oneRM = get1RM(cur.weight, cur.reps); const fav = !!state.favorites[name];
          return <div className="card exercise" key={name}>
            <div className="exerciseTop">
              <div style={{flex:1}}>
                <div className="exerciseTitle">
                  <h3>{name}</h3>
                  <span className="badge fill">{muscle}</span>
                  <span className="badge">{series}</span>
                  <span className="badge">Descanso {rest}s</span>
                  <button className={`btn small ${fav ? 'primary':''}`} onClick={()=>setState(prev=>({...prev, favorites:{...prev.favorites, [name]: !prev.favorites[name]}}))}><Star size={14} style={{verticalAlign:'middle', marginRight:6}}/>{fav ? 'Favorito' : 'Marcar'}</button>
                  <button className="btn small" onClick={()=>{setTimer(rest); setRunning(false);}}>Usar descanso</button>
                </div>
                <p className="muted" style={{margin:'10px 0 0'}}>{how}</p>
                <details className="details"><summary className="summary">Ver consejos y sustituciones</summary>
                  <div style={{marginTop:10}}>
                    <div style={{fontWeight:700, marginBottom:4}}>Consejos</div>
                    <ul>{tips.map(t=><li key={t} className="muted">{t}</li>)}</ul>
                    <div style={{fontWeight:700, marginTop:10, marginBottom:4}}>Sustituciones</div>
                    <div className="btnRow">{subs.map(s=><span key={s} className="badge">{s}</span>)}</div>
                    <div style={{fontWeight:700, marginTop:10, marginBottom:4}}>Mi sustitución favorita</div>
                    <input className="input" placeholder="Ej: press mancuernas" value={state.customSubs[name] || ''} onChange={e=>setState(prev=>({...prev, customSubs:{...prev.customSubs, [name]: e.target.value}}))}/>
                  </div>
                </details>
                <details className="details"><summary className="summary">Ver vídeo</summary><div className="videoWrap"><iframe src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(video)}`} title={name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div></details>
              </div>
              <div style={{minWidth:220}}>
                <div className="metric"><div><strong>Último registro:</strong> {prev?.date || '-'}</div><div><strong>Peso anterior:</strong> {prev?.weight || '-'}</div><div><strong>1RM estimado:</strong> {oneRM || '-'}</div><div className={cur.weight && prev ? (diff>0?'progressGood':diff<0?'progressWarn':'progressFlat') : 'progressFlat'}>{cur.weight && prev ? (diff>0?`Subida: +${diff} kg`:diff<0?`Bajada: ${diff} kg`:'Mismo peso') : 'Sin comparación'}</div></div>
              </div>
            </div>
            <div className="grid3">
              <div><div style={{fontWeight:600, marginBottom:6}}>Peso usado</div><input className="input" placeholder="Ej: 60 kg" value={cur.weight} onChange={e=>setLog(selectedDay,name,'weight',e.target.value)}/></div>
              <div><div style={{fontWeight:600, marginBottom:6}}>Reps hechas</div><input className="input" placeholder="Ej: 8,8,7" value={cur.reps} onChange={e=>setLog(selectedDay,name,'reps',e.target.value)}/></div>
              <div><div style={{fontWeight:600, marginBottom:6}}>Notas</div><input className="input" placeholder="Sensaciones, dolor, mejora..." value={cur.notes} onChange={e=>setLog(selectedDay,name,'notes',e.target.value)}/></div>
            </div>
          </div>
        })}

        <div className="card"><div className="cardHead"><h2><Dumbbell size={18} style={{verticalAlign:'middle', marginRight:6}}/>Notas generales del día</h2></div><div className="cardBody">
          <textarea className="textarea" placeholder="Ejemplo: hoy me he visto fuerte en prensa, subir 10 kg la próxima semana..." value={state.notesByDate[selectedDate] || ''} onChange={e=>setState(prev=>({...prev, notesByDate:{...prev.notesByDate, [selectedDate]: e.target.value}}))}/>
          <div className="footerNote">Todo se guarda automáticamente en este dispositivo.</div>
        </div></div>
      </div>
    </div>
  </div>
}
