const DEFAULT_SISTEMAS = {
    gastro: {
        nome: 'Gastrointestinal',
        icon: 'activity', 
        cor: '#ef4444',
        desc: 'Protocolo de análise macroscópica do trato gastrointestinal e órgãos anexos.',
        itens: {
            esofago:          { nome: 'Esôfago',          icon: 'clipboard-list', conteudo: '' },
            estomago:         { nome: 'Estômago',         icon: 'clipboard-list', conteudo: '' },
            'intestino-delgado': { nome: 'Intestino Delgado',  icon: 'clipboard-list', conteudo: '' },
            'colon-reto':     { nome: 'Cólon e Reto',     icon: 'clipboard-list', conteudo: '' },
            apendice:         { nome: 'Apêndice',         icon: 'clipboard-list', conteudo: '' },
            figado:           { nome: 'Fígado',           icon: 'clipboard-list', conteudo: '' },
            'vesicula-biliar':{ nome: 'Vesícula Biliar',  icon: 'clipboard-list', conteudo: '' },
            pancreas:         { nome: 'Pâncreas',         icon: 'clipboard-list', conteudo: '' },
        }
    },
    mama: {
        nome: 'Mama',
        icon: 'stethoscope',
        cor: '#f97316',
        desc: 'Protocolos de mastectomia, quadrantectomia e demais amostras mamárias.',
        itens: {
            'mastectomia-radical': { nome: 'Mastectomia Radical Modificada', icon: 'clipboard-list', conteudo: '' },
            'mastectomia-simples': { nome: 'Mastectomia Simples',            icon: 'clipboard-list', conteudo: '' },
            quadrantectomia:       { nome: 'Quadrantectomia',                icon: 'clipboard-list', conteudo: '' },
            setorectomia:          { nome: 'Setorectomia',                   icon: 'clipboard-list', conteudo: '' },
            'core-biopsy':         { nome: 'Core Biopsy',                    icon: 'clipboard-list', conteudo: '' },
            'linfonodo-sentinela': { nome: 'Linfonodo Sentinela',            icon: 'clipboard-list', conteudo: '' },
        }
    },
    genito: {
        nome: 'Genitourinário',
        icon: 'droplet',
        cor: '#8b5cf6',
        desc: 'Protocolo de análise macroscópica do sistema genitourinário masculino e feminino.',
        itens: {
            rim:      { nome: 'Rim — Nefrectomia',      icon: 'clipboard-list', conteudo: '' },
            bexiga:   { nome: 'Bexiga — Cistectomia',   icon: 'clipboard-list', conteudo: '' },
            prostata: { nome: 'Próstata',               icon: 'clipboard-list', conteudo: '' },
            testiculo:{ nome: 'Testículo',              icon: 'clipboard-list', conteudo: '' },
            penis:    { nome: 'Pênis',                  icon: 'clipboard-list', conteudo: '' },
            ureter:   { nome: 'Ureter',                 icon: 'clipboard-list', conteudo: '' },
        }
    },
    gineco: {
        nome: 'Ginecológico',
        icon: 'flower-2',
        cor: '#ec4899',
        desc: 'Protocolo de análise macroscópica de peças do sistema ginecológico.',
        itens: {
            'utero-prolapso':   { nome: 'Útero de Prolapso Uterino', icon: 'clipboard-list', conteudo: '' },
            'utero-miomatose':  { nome: 'Útero de Miomatose',        icon: 'clipboard-list', conteudo: '' },
            'utero-neoplasico': { nome: 'Útero Neoplásico',          icon: 'clipboard-list', conteudo: '' },
            'ovario-inocente':  { nome: 'Ovário Inocente',           icon: 'clipboard-list', conteudo: '' },
            'ovario-cistico':   { nome: 'Ovário Cístico',            icon: 'clipboard-list', conteudo: '' },
            'ovario-maligno':   { nome: 'Ovário Maligno',            icon: 'clipboard-list', conteudo: '' },
            'tuba-uterina':     { nome: 'Tuba Uterina',              icon: 'clipboard-list', conteudo: '' },
        }
    },
    pequenas: {
        nome: 'Pequenas Peças',
        icon: 'microscope',
        cor: '#14b8a6',
        desc: 'Protocolo de análise macroscópica de pequenas peças e biópsias cirúrgicas.',
        itens: {
            pele:              { nome: 'Pele',              icon: 'clipboard-list', conteudo: '' },
            linfonodo:         { nome: 'Linfonodo',         icon: 'clipboard-list', conteudo: '' },
            'partes-moles':    { nome: 'Partes Moles',      icon: 'clipboard-list', conteudo: '' },
            tiroide:           { nome: 'Tireoide',          icon: 'clipboard-list', conteudo: '' },
            paratiroide:       { nome: 'Paratireoide',      icon: 'clipboard-list', conteudo: '' },
            'glandula-salivar':{ nome: 'Glândula Salivar',  icon: 'clipboard-list', conteudo: '' },
            osso:              { nome: 'Osso',              icon: 'clipboard-list', conteudo: '' },
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DEFAULT_SISTEMAS;
}
