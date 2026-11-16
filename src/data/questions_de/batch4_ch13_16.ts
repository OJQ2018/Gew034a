import { QuestionDeContent } from '../../types/encyclopedia';

export const QUESTIONS_DE_13_16: Record<number, QuestionDeContent> = {
  // Kapitel 13: Erste Hilfe (313–338)
  313: {
    questionDe: 'Was besagt die gesetzliche Hilfeleistungspflicht nach § 323c StGB und wie ist der Ersthelfer vor Haftung für unbeabsichtigte Schäden geschützt?',
    answerDe: 'Wer bei Unglücksfällen oder gemeiner Gefahr nicht hilft, obwohl dies erforderlich und ohne erhebliche eigene Gefahr zumutbar ist, macht sich nach § 323c StGB wegen unterlassener Hilfeleistung strafbar. Der Ersthelfer haftet bei normaler Fahrlässigkeit nicht (Geschäftsführung ohne Auftrag / § 680 BGB; z. B. gebrochene Rippe bei der HLW) und steht unter gesetzlichem Unfallversicherungsschutz (§ 2 Abs. 1 Nr. 13 SGB VII).',
  },
  314: {
    questionDe: 'Wie lauten die fünf Glieder der Rettungskette in der richtigen Reihenfolge?',
    answerDe: '1. Sofortmaßnahmen (Absichern der Unfallstelle, Eigensicherung, Retten aus Gefahrenbereich), 2. Notruf absetzen (112 mit W-Fragen), 3. Weitere Erste Hilfe (HLW, stabile Seitenlage, Wundversorgung), 4. Rettungsdienst / Notarzt vor Ort, 5. Krankenhaus / klinische Weiterversorgung.',
  },
  315: {
    questionDe: 'Wie prüft der Ersthelfer Bewusstsein und Atmung beim Auffinden einer Person und welche Konsequenzen ergeben sich?',
    answerDe: 'Bewusstsein prüfen durch lautes Ansprechen und sanftes Rütteln an den Schultern. Reagiert die Person nicht: Hilferuf absetzen, Kopf vorsichtig überstrecken (Kinn anheben) und max. 10 Sekunden durch Sehen, Hören und Fühlen die Atmung prüfen. Normale Atmung vorhanden -> stabile Seitenlage + 112; keine normale Atmung (auch Schnappatmung) -> sofort 112 + AED + Herzdruckmassage 30:2.',
  },
  316: {
    questionDe: 'Wozu dient die stabile Seitenlage und wann genau wird sie angewendet?',
    answerDe: 'Die stabile Seitenlage sichert bei bewusstlosen Personen mit normaler Eigenatmung die Atemwege, verhindert das Zurückfallen der Zunge und sorgt dafür, dass Blut oder Erbrochenes abfließen können (Schutz vor Ersticken). Sie darf nicht angewendet werden, wenn keine normale Atmung vorliegt.',
  },
  317: {
    questionDe: 'Welche genauen Regeln gelten für die Herz-Lungen-Wiederbelebung (HLW) bei Erwachsenen?',
    answerDe: 'Verhältnis 30 Herzdruckmassagen zu 2 Atemspenden (30:2). Druckpunkt: Mitte des Brustkorbs (untere Hälfte des Brustbeins), Drucktiefe ca. 5–6 cm, Frequenz 100–120/Minute mit voller Entlastung. Ohne Beatmungsmaske oder bei Ekel darf auch durchgehend gedrückt werden („Hands-only“).',
  },
  318: {
    questionDe: 'Was ist ein Automatisierter Externer Defibrillator (AED) und darf ein Sicherheitsmitarbeiter ohne medizinische Ausbildung ihn anwenden?',
    answerDe: 'Ein AED analysiert automatisch den Herzrhythmus und gibt nur bei lebensbedrohlichem Kammerflimmern per Sprachansage einen Elektroschock frei. Jeder Laie und Sicherheitsmitarbeiter darf (und soll) ihn anwenden; rechtlich gilt die Notstands-/Hilfeleistungsbefugnis ohne ärztliche Vorbildung.',
  },
  319: {
    questionDe: 'Welche Symptome kennzeichnen einen medizinischen Schock (Kreislaufversagen) und wie wird die Schocklage ausgeführt?',
    answerDe: 'Symptome: blasse/kaltschweißige Haut, schneller und schwacher Puls, Zittern, Unruhe oder Teilnahmslosigkeit. Maßnahmen: Betroffenen flach hinlegen, Beine um ca. 30–40 cm hochlagern (Schocklage), vor Auskühlung schützen, beruhigen und 112 rufen (Achtung: Keine Schocklage bei Herzinfarkt, Atemnot, Bein-/Wirbelsäulenbruch oder Bewusstlosigkeit).',
  },
  320: {
    questionDe: 'Wie versorgt der Ersthelfer eine starke Blutung und wie wird ein Druckverband angelegt?',
    answerDe: 'Eigenschutz mit Einmalhandschuhen! Extremität hochhalten, keimfreie Wundauflage aufdrücken und eine Mullbinde darüber wickeln. Auf die Wunde ein ungeöffnetes Verbandpäckchen als Druckpolster legen und dieses straff überwickeln. Bei anhaltendem Durchbluten zweites Druckpolster darüber wickeln, erstes nicht abnehmen.',
  },
  321: {
    questionDe: 'Wie leistet der Sicherheitsmitarbeiter Erste Hilfe bei Verdacht auf Herzinfarkt oder Schlaganfall am Objekt?',
    answerDe: 'Sofort 112 mit Verdacht melden. Bei Herzinfarkt (starker Brustschmerz, Ausstrahlung in linken Arm/Kiefer, Kaltschweiß): Oberkörper erhöht lagern (halb sitzend), beengende Kleidung öffnen, jede Anstrengung vermeiden, beruhigen. Bei Schlaganfall (FAST-Test: Gesicht hängt, Arm sinkt, Sprache verwaschen): Oberkörper leicht erhöht lagern, nichts zu trinken geben.',
  },
  322: {
    questionDe: 'Welche Regeln gelten für die Erste Hilfe bei thermischen Verbrennungen und chemischen Verätzungen?',
    answerDe: 'Verbrennungen: Kleinflächige Verbrennungen sofort maximal 10–15 Minuten mit handwarmem Wasser (ca. 15–20 °C, nicht eisgekühlt) kühlen; großflächige Verbrennungen nicht kühlen (Unterkühlungsgefahr), sondern steril und locker bedecken; klebende Kleidung niemals abreißen. Verätzungen: sofort mit viel klarem Wasser spülen (Schutzhandschuhe tragen!), Sicherheitsdatenblatt für 112 bereithalten.',
  },
  323: {
    questionDe: 'Wie viele betriebliche Ersthelfer sind in Unternehmen vorgeschrieben und wie muss das Erste-Hilfe-Material aufbewahrt werden?',
    answerDe: 'Nach DGUV V1 (§ 26): bei 2–20 anwesenden Versicherten mind. 1 Ersthelfer; über 20 Versicherte in Bürobetrieben 5 %, in sonstigen Betrieben/Produktion 10 %. Verbandkästen (DIN 13157 / 13169) müssen leicht zugänglich, mit grünem Kreuz gekennzeichnet und regelmäßig auf Vollständigkeit und Verfallsdatum geprüft werden.',
  },
  324: {
    questionDe: 'Welchen Zweck erfüllt die Rettungsdecke und wann zeigt die silberne bzw. goldene Seite zum Körper?',
    answerDe: 'Sie schützt vor Auskühlung (Unterkühlung), Nässe und Wind sowie vor Überhitzung. Kälteschutz (Standard bei Unfall/Schock): silberne Seite zum Körper (reflektiert Körperwärme zurück), goldene Seite nach außen (Sichtbarkeit). Hitzeschutz/Sonnenschutz: goldene Seite nach innen bzw. silberne Seite nach außen zur Sonnenreflexion.',
  },
  325: {
    questionDe: 'Wie verhält sich der Sicherheitsmitarbeiter bei einem bewusstlosen Motorradfahrer: Helm abnehmen oder auflassen?',
    answerDe: 'Bei einem bewusstlosen Motorradfahrer muss der Schutzhelm vorsichtig (ideal zu zweit: einer stabilisiert den Hals, der andere zieht den Helm ab) abgenommen werden, weil sonst Atmung und Bewusstseinskontrolle unmöglich sind und Erstickungsgefahr droht. Ist der Fahrer bei vollem Bewusstsein ohne Atemnot, bleibt der Helm bis zum Eintreffen von 112 auf.',
  },
  326: {
    questionDe: 'Was ist richtig bei Verschlucken eines Fremdkörpers (Atemwegsverlegung) und bei einem Stromunfall?',
    answerDe: 'Verschlucken: Zum kräftigen Husten ermutigen; bei schwerer Atemnot bis zu 5 Schläge zwischen die Schulterblätter (vornübergebeugt) im Wechsel mit bis zu 5 Oberbauchkompressionen (Heimlich-Handgriff) und 112 rufen. Stromunfall: Zuerst Stromkreis sicher abschalten (Stecker/Sicherung/Not-Aus), Verunfallten erst nach Spannungsfreiheit anfassen! (Hochspannung > 1.000 V: min. 20 m Sicherheitsabstand halten!).',
  },
  327: {
    questionDe: 'Welche Schritte sind bei Amputationsverletzungen zum Schutz des Verletzten und des abgetrennten Körperteils nötig?',
    answerDe: 'Am verletzten Körperteil Blutung mit Druckverband stillen, hochlagern, 112 rufen. Amputat trocken und steril (Wundtuch) verpacken (nicht waschen, nicht desinfizieren, nicht direkt in Eiswasser legen!), in einen sauberen wasserdichten Beutel legen und diesen in einen zweiten Beutel mit Eiswasser/Kühlpack kühlen.',
  },
  328: {
    questionDe: 'Wie reagiert man sachgerecht auf einen epileptischen Krampfanfall oder eine schwere Unterzuckerung eines Besuchers?',
    answerDe: 'Krampfanfall: Person vor Anstoßverletzungen schützen (harte Gegenstände wegräumen, Kopf polstern), NICHT festhalten und NICHTS zwischen die Zähne schieben; nach dem Anfall Atmung prüfen und ggf. stabile Seitenlage + 112. Unterzuckerung: Wenn bei Bewusstsein und schluckfähig -> Traubenzucker oder zuckerhaltiges Getränk geben; bei Bewusstlosigkeit -> stabile Seitenlage + 112, nichts einflößen.',
  },
  329: {
    questionDe: 'Wann darf ein Ersthelfer einen Verletzten mittels Rautek-Rettungsgriff bewegen und wann ist Bewegen verboten?',
    answerDe: 'Grundsätzlich soll ein Verletzter (insb. bei Verdacht auf Wirbelsäulenverletzung) bis zum Eintreffen des Rettungsdienstes nicht bewegt werden. Ausnahme: akute Lebensgefahr am Unfallort (Brand, Rauch, Explosion, Straßenverkehr) -> dann Rettung mit dem Rautek-Rettungsgriff aus dem Gefahrenbereich.',
  },
  330: {
    questionDe: 'Welche Priorität gilt im Nachtdienst bei einem schweren medizinischen Notfall: Rettungswagen einweisen oder beim Patienten bleiben?',
    answerDe: 'Lebenserhaltende Sofortmaßnahmen (HLW, Blutung stillen, Atemwege freihalten) haben absoluten Vorrang und dürfen nicht unterbrochen werden. Ein allein arbeitender Wachmann weist nach Möglichkeit über Gegensprechanlage/Schranke ein oder öffnet beim Notruf das Tor vorab bzw. ruft einen Kollegen zur Einweisung, ohne den Patienten unversorgt zu lassen.',
  },
  331: {
    questionDe: 'IHK-Prüfungsfall: Im Foyer bricht ein Besucher zusammen. Auf Ansprache und Schulterrütteln reagiert er nicht. Beim Atemcheck hören Sie nur vereinzeltes, langsames Schnappen (Schnappatmung). Was tun Sie sofort?',
    answerDe: 'Schnappatmung zählt medizinisch als Atemstillstand! Sofort 112 alarmieren, AED holen lassen und unverzüglich mit der Herz-Lungen-Wiederbelebung (30 Herzdruckmassagen : 2 Beatmungen) beginnen.',
    mcqOptionsDe: {
      A: 'Den Besucher in die stabile Seitenlage drehen und 15 Minuten abwarten, da Schnappatmung normale Atmung ist',
      B: 'Sofort Notruf 112 absetzen, AED beschaffen lassen und unverzüglich mit der HLW (30:2) beginnen, da Schnappatmung keine normale Atmung ist',
      C: 'Einen Becher kaltes Wasser ins Gesicht schütten und die Person auf einen Stuhl setzen',
      D: 'Ohne Berührung abwarten, bis ein Arzt eintrifft, um keine Rippe zu brechen',
    },
  },
  332: {
    questionDe: 'IHK-Prüfungsfall: Im Einkaufszentrum finden Sie eine bewusstlose Person, die jedoch ruhig und regelmäßig atmet und keine starken Blutungen aufweist. Welche Maßnahmen sind richtig?',
    answerDe: 'Da normale Atmung vorliegt, wird die Person in die stabile Seitenlage mit leicht überstrecktem Kopf und geöffnetem Mund nach unten gebracht, der Notruf 112 abgesetzt, vor Auskühlung geschützt und bis zum Eintreffen der Rettung überwacht.',
    mcqOptionsDe: {
      A: 'Die Person in die stabile Seitenlage bringen, Kopf überstrecken und Mund tief lagern',
      B: 'Notruf 112 wählen, zudecken und die Atmung fortlaufend bis zum Eintreffen des Rettungsdienstes kontrollieren',
      C: 'Sofort kräftige Herzdruckmassage (30:2) durchführen, obwohl regelmäßige Eigenatmung vorliegt',
      D: 'Die Person flach auf dem Rücken liegen lassen und schluckweise Kaffee einflößen',
    },
  },
  333: {
    questionDe: 'IHK-Prüfungsfall: Welche Aussagen zu Haftung, Schutz vor Versehen und Unfallversicherungsschutz bei Erster Hilfe durch Sicherheitsmitarbeiter treffen zu?',
    answerDe: 'Der Ersthelfer haftet nicht für leichte oder normale Fahrlässigkeit bei Rettungsmaßnahmen (§ 680 BGB, z. B. gebrochene Rippe) und genießt gesetzlichen Unfallversicherungsschutz (SGB VII).',
    mcqOptionsDe: {
      A: 'Bricht bei sachgerechter Herzdruckmassage versehentlich eine Rippe, ist der Ersthelfer rechtlich durch § 680 BGB geschützt',
      B: 'Der Ersthelfer steht bei Eigenschäden oder Sachschäden an seiner Kleidung unter dem Schutz der gesetzlichen Unfallversicherung (SGB VII)',
      C: 'Ohne medizinisches Hochschulstudium ist dem Sicherheitsmitarbeiter auch das Verbinden kleiner Wunden gesetzlich verboten',
      D: '§ 323c StGB gilt nur für Polizeibeamte und nicht für private Sicherheitskräfte',
    },
  },
  334: {
    questionDe: 'IHK-Prüfungsfall: Ein Kollege klagt nach dem Treppensteigen über starke drückende Brustschmerzen, die in den linken Arm ausstrahlen, kalten Schweiß und Atemnot. Welche Lagerung ist richtig?',
    answerDe: 'Verdacht auf Herzinfarkt! Keine Schocklage (Beine hoch würde das Herz noch mehr belasten), sondern Oberkörper erhöht lagern (halb sitzend), enge Kleidung öffnen, beruhigen und sofort 112 rufen.',
    mcqOptionsDe: {
      A: 'Flach auf den Boden legen und beide Beine 40 cm hochlagern (Schocklage)',
      B: 'Oberkörper erhöht/halb sitzend lagern, enge Kleidung lockern, Betroffenen beruhigen und sofort 112 rufen',
      C: 'Zwei starke Schmerztabletten aus der privaten Tasche geben und spazieren gehen lassen',
      D: 'Eine Stunde abwarten, ob die Schmerzen von selbst wieder verschwinden',
    },
  },
  335: {
    questionDe: 'IHK-Prüfungsfall: In einer Werkhalle hat ein Mitarbeiter eine stark blutende tiefe Wunde am Unterarm, in der noch eine 5 cm lange Glasscherbe steckt. Was ist zu tun?',
    answerDe: 'Schutzhandschuhe anziehen, 112 rufen und den Fremdkörper (Glasscherbe) niemals herausziehen! Stattdessen um den Fremdkörper herum steril abpolstern und vorsichtig fixieren.',
    mcqOptionsDe: {
      A: 'Sofort Einmalhandschuhe zum Infektionsschutz anziehen und Notruf 112 wählen',
      B: 'Die Glasscherbe in der Wunde belassen, rundherum keimfrei abpolstern/fixieren und Schockzeichen beobachten',
      C: 'Die Glasscherbe mit bloßen Händen blitzschnell herausziehen und die Wunde mit Spiritus auswaschen',
      D: 'Mit voller Kraft direkt auf das spitze Glasstück drücken, um die Blutung zu stoppen',
    },
  },
  336: {
    questionDe: 'IHK-Prüfungsfall: Welche Anweisungen sind beim Einsatz eines Automatisierten Externen Defibrillators (AED) durch Sicherheitskräfte korrekt?',
    answerDe: 'Gerät einschalten und den Sprachansagen folgen, nasse Brust vor dem Aufkleben der Elektroden trocknen, während Analyse und Schockabgabe niemanden berühren und anschließend die HLW 30:2 sofort fortsetzen.',
    mcqOptionsDe: {
      A: 'Gerät einschalten, Sprachanweisungen befolgen und feuchte Haut vor Aufkleben der Elektroden abtrocknen',
      B: 'Während Analyse und Schockabgabe Abstand halten (niemand berührt den Patienten), danach HLW 30:2 sofort fortführen',
      C: 'Nach einem abgegebenen Schock das Gerät ausschalten und den Raum verlassen',
      D: 'Genau im Moment der Schockabgabe kräftig mit beiden Händen auf der Brust weiterdrücken',
    },
  },
  337: {
    questionDe: 'IHK-Prüfungsfall: Ein Mitarbeiter liegt auf dem Hof an einem abgerissenen 230-Volt-Kabel einer Maschine und verkrampft durch den Stromfluss. Erste zwingende Maßnahme?',
    answerDe: 'Lebensgefahr durch Stromschlag! Verunfallten auf keinen Fall direkt anfassen, sondern zuerst den Stromkreis über Stecker, Sicherungskasten oder Not-Aus-Schalter unterbrechen und dann 112 + Erste Hilfe leisten.',
    mcqOptionsDe: {
      A: 'Den Verletzten sofort mit bloßen Händen an den Schultern packen und vom Kabel wegziehen',
      B: 'Den Verletzten nicht berühren, sofort Strom abschalten (Stecker/Sicherung/Not-Aus), dann 112 rufen und Erste Hilfe leisten',
      C: 'Den Verunfallten und das Stromkabel sofort mit einem Wasserschlauch abkühlen',
      D: 'Stehen bleiben und zuschauen, bis der Strom irgendwann von selbst ausfällt',
    },
  },
  338: {
    questionDe: 'IHK-Prüfungsfall: In welchen Fällen ist die Schocklage (Beine hochlagern) ausdrücklich verboten und durch Oberkörperhochlagerung oder flache Lagerung zu ersetzen?',
    answerDe: 'Die Schocklage ist verboten bei Herzbeschwerden / Atemnot (hier Oberkörper hoch) sowie bei Verdacht auf Bein-, Becken- oder Wirbelsäulenbrüche bzw. Schädel-Hirn-Verletzung und Bewusstlosigkeit.',
    mcqOptionsDe: {
      A: 'Bei akutem Herzinfarkt oder starker Atemnot (hier Oberkörper erhöht lagern)',
      B: 'Bei Verdacht auf Frakturen von Beinen, Becken oder Wirbelsäule sowie bei Bewusstlosigkeit oder Kopfverletzung',
      C: 'Bei einer kleinen Schnittwunde am Finger mit leichtem Schwindel ohne weitere Verletzung',
      D: 'Bei Kreislaufschwäche nach einer Blutspende bei klarem Bewusstsein und normaler Atmung',
    },
  },

  // Kapitel 14: Rechte und Pflichten des Sicherheitsmitarbeiters (339–364)
  339: {
    questionDe: 'Welcher oberste Rechtsgrundsatz bestimmt die Befugnisse eines privaten Sicherheitsmitarbeiters im Vergleich zur Polizei?',
    answerDe: 'Im Sicherheitsgewerbe gilt das Prinzip: Keine Hoheitsrechte (kein staatliches Gewaltmonopol). Ein Sicherheitsmitarbeiter hat dieselben Jedermannsrechte wie jeder Bürger (§ 32 StGB, § 34 StGB, § 127 Abs. 1 StPO, §§ 227–229, 904 BGB) sowie ggf. vom Auftraggeber privatrechtlich übertragene Rechte (Hausrecht, Besitzwehr §§ 859, 860 BGB).',
  },
  340: {
    questionDe: 'Was versteht man unter Amtsanmaßung (§ 132 StGB) und welcher Zusammenhang besteht zur Dienstkleidung nach § 19 BewachV?',
    answerDe: 'Nach § 132 StGB macht sich strafbar, wer sich unbefugt mit der Ausübung eines öffentlichen Amtes befasst oder eine Diensthandlung vornimmt, die nur Kraft eines öffentlichen Amtes vorgenommen werden darf (z. B. sich als Polizist ausgeben). § 19 BewachV schreibt daher vor, dass Dienstkleidung von Sicherheitskräften nicht mit amtlichen Uniformen (Polizei, Ordnungsamt) verwechselbar sein darf.',
  },
  341: {
    questionDe: 'Welche Ausweis-, Mitführ- und Sichtbarkeitspflichten gelten für Sicherheitsmitarbeiter im Dienst nach § 18 BewachV?',
    answerDe: 'Nach § 18 Abs. 1 BewachV hat der Arbeitgeber einen Dienstausweis auszustellen (mit Namen von Mitarbeiter & Gewerbetreibendem, Bewacherregister-ID bzw. Daten), den die Wachperson im Dienst stets mitzuführen und auf Verlangen vorzuzeigen hat; zugleich ist der Personalausweis/Pass mitzuführen (§ 18 Abs. 1 S. 3). Nach § 18 Abs. 2 BewachV muss ein sichtbares Namens-/Kennzeichnungsschild u. a. bei Kontrollgängen im öffentlichen Raum, Diskotheken und Flüchtlingsunterkünften getragen werden.',
  },
  342: {
    questionDe: 'Was regelt die Pflicht zur Wahrung von Betriebs- und Geschäftsgeheimnissen (§ 9 BewachV) und wann endet sie?',
    answerDe: 'Nach § 9 BewachV müssen Wachpersonal und Gewerbetreibende fremde Geschäfts- und Betriebsgeheimnisse, die ihnen bei der Ausübung ihres Dienstes bekannt werden, streng vertraulich behandeln (u. a. Alarmschaltungen, Schließpläne, Kundenlisten). Diese Verschwiegenheitspflicht gilt zeitlich unbegrenzt – auch nach Beendigung des Arbeitsverhältnisses fort.',
  },
  343: {
    questionDe: 'Was ist die Dienstanweisung (§ 10 BewachV) und welche Arten unterscheidet man?',
    answerDe: 'Nach § 10 BewachV hat der Gewerbetreibende den Dienstanweisungsbereich schriftlich zu regeln und der Wachperson gegen Empfangsbestätigung auszuhändigen. Man unterscheidet die Allgemeine Dienstanweisung (unternehmensweite Grundregeln, z. B. Uniform, Schweigepflicht, Verhalten bei Notfällen) und die Besondere/Objektspezifische Dienstanweisung (konkrete Vorgaben für ein bestimmtes Objekt, Rundgangszeiten, Schließordnung).',
  },
  344: {
    questionDe: 'Welche Bedeutung hat das Wachbuch (Schichtbuch) und welche strengen Regeln gelten für seine Führung als Beweisdokument?',
    answerDe: 'Das Wachbuch dokumentiert alle relevanten Vorkommnisse, Kontrollgänge, Übergaben und Störungen im Dienst und dient im Streit- oder Schadensfall als wichtiges Beweismittel vor Gericht oder Versicherungen. Einträge müssen wahrheitsgemäß, chronologisch, lückenlos und dokumentenecht (kein Bleistift, kein Tipp-Ex!) erfolgen; Korrekturen dürfen nur mit einem sauberen Strich lesbar durchgestrichen und gegengezeichnet werden.',
  },
  345: {
    questionDe: 'Worin unterscheiden sich arbeitsrechtliche Treuepflicht und das Direktions-/Weisungsrecht zwischen Auftraggeber und Sicherheitsunternehmen?',
    answerDe: 'Die Treuepflicht verpflichtet den Arbeitnehmer gegenüber seinem Arbeitgeber (Sicherheitsfirma) zu Loyalität, Schadensabwendung und Verschwiegenheit. Das Weisungsrecht (§ 106 GewO) steht arbeitsvertraglich dem Arbeitgeber (Wachunternehmen) zu; der Auftraggeber (Kunde) darf jedoch über das vereinbarte Objekt hinaus regelmäßig nur im Rahmen der Dienstanweisung koordinierende/objektbezogene Anweisungen geben und keine gesetzeswidrigen Befehle erteilen.',
  },
  346: {
    questionDe: 'Was bedeutet die Garantenpflicht bzw. Garantenstellung (§ 13 StGB) für einen eingesetzten Sicherheitsmitarbeiter?',
    answerDe: 'Durch vertragliche Übernahme eines Schutz- oder Überwachungsauftrags erwirbt der Sicherheitsmitarbeiter während seiner Schicht eine rechtliche Garantenstellung (§ 13 StGB: Begehen durch Unterlassen). Unterlässt er pflichtwidrig die Abwendung von Schäden oder Gefahren am Schutzobjekt (z. B. bewusstes Wegsehen bei Diebstahl oder Brand), macht er sich strafbar wie durch aktives Tun.',
  },
  347: {
    questionDe: 'Was regelt die Pflicht zur Anzeige geplanter schwerer Straftaten (§ 138 StGB) im Vergleich zu bereits begangenen Delikten?',
    answerDe: 'Gemäß § 138 StGB ist jeder verpflichtet, bestimmte besonders schwere geplante Straftaten (z. B. Mord, Totschlag, Raub, gemeingefährliche Brandstiftung, Terrorismus), von deren Vorhaben er glaubhaft erfährt, rechtzeitig bei der Polizei oder dem Bedrohten anzuzeigen, solange sie noch verhindert werden können. Für bereits begangene einfache Delikte gibt es für Privatpersonen grundsätzlich keine allgemeine Anzeigepflicht (Ausnahme: vertragliche/Dienstanweisungspflicht gegenüber dem Kunden).',
  },
  348: {
    questionDe: 'Welche Rechte hat der Sicherheitsmitarbeiter beim Filmen oder Fotografieren durch aufgebrachte Besucher (§§ 22, 23 KUG, DSGVO, § 201 StGB)?',
    answerDe: 'Jeder Mensch besitzt das Recht am eigenen Bild (§ 22 KUG / Art. 6 DSGVO); eine Veröffentlichung ohne Einwilligung ist regelmäßig unzulässig (Ausnahmen § 23 KUG nur eingeschränkt bei großen Menschenmengen als Beiwerk). Heimliche Tonaufnahmen des nichtöffentlich gesprochenen Wortes sind nach § 201 StGB strafbar. Der Mitarbeiter widerspricht der Aufnahme klar, setzt ggf. das Hausrecht (Platzverweis) durch und ruft bei Eskalation die Polizei – darf aber niemals fremde Handys gewaltsam entreißen.',
  },
  349: {
    questionDe: 'Was versteht man unter dem Grundsatz der Verhältnismäßigkeit und welche drei Prüfstufen gehören dazu?',
    answerDe: 'Das Verhältnismäßigkeitsprinzip verlangt, dass jedes Mittel zum Eingriff in fremde Rechte maßvoll bleibt: 1. Geeignetheit (tauglich zur Zielerreichung), 2. Erforderlichkeit (das mildeste unter gleich wirksamen Mitteln), 3. Angemessenheit / Zumutbarkeit (Zweck und Eingriffsintensität stehen nicht außer Verhältnis).',
  },
  350: {
    questionDe: 'Welche Vorgaben gelten bei Arbeits- und Ruhezeiten sowie beim Hinweis auf Rechtsverstöße (Arbeitszeitgesetz & Schutzpflichten)?',
    answerDe: 'Nach dem ArbZG beträgt die werktägliche Arbeitszeit regulär max. 8 Std. (verlängerbar auf 10 Std. bei Ausgleich innerhalb von 6 Monaten), mit mindestens 11 Stunden ununterbrochener Ruhezeit zwischen Schichten und Pausenpflicht (30 Min. ab > 6 Std., 45 Min. ab > 9 Std.). Tarifverträge im Wachgewerbe lassen für Bereitschaftsdienst Abweichungen unter strengem Gesundheitsschutz zu. Rechtswidrige Anweisungen von Vorgesetzten darf und muss der Mitarbeiter ablehnen.',
  },
  351: {
    questionDe: 'Unter welchen engen Voraussetzungen darf ein privater Sicherheitsmitarbeiter Handfesseln mitführen und einsetzen?',
    answerDe: 'Das Mitführen von Handfesseln fällt nicht unter das WaffG, erfordert aber eine Genehmigung des Arbeitgebers nach der Dienstanweisung. Die Anwendung (Anlegen gegen den Willen einer Person) ist eine erhebliche Freiheitsbeschränkung und nur ausnahmsweise zulässig, wenn ein gültiger Rechtfertigungsgrund vorliegt (z. B. Notwehr § 32 StGB oder akuter gewalttätiger Flucht-/Angriffsversuch bei § 127 StPO als letztes erforderliches Mittel), wobei stets die Arretierung gegen zu starkes Zudrücken und Atemsicherheit (kein Druck auf den Brustkorb!) zu beachten sind.',
  },
  352: {
    questionDe: 'Wie ist rechtlich mit Fundsachen (§§ 965–978 BGB) im bewachten Objekt zu verfahren?',
    answerDe: 'Wer eine verlorene Sache im Wert über 10 € findet, hat sie anzuzeigen und abzugeben (§ 965 BGB). Bei Funden in öffentlichen Gebäuden, Verkehrsmitteln oder privaten Großobjekten (z. B. Einkaufszentrum, Bürohaus) gilt regelmäßig § 978 BGB: Der Fund ist unverzüglich beim Betreiber / Fundbüro des Objekts gegen Quittung abzuliefern; ein Behalten durch den Sicherheitsmitarbeiter ist Unterschlagung (§ 246 StGB).',
  },
  353: {
    questionDe: 'Darf ein Sicherheitsmitarbeiter den Personalausweis oder Reisepass eines Besuchers als Pfand für den Besucherausweis einbehalten?',
    answerDe: 'Nein! Nach § 1 Abs. 1 S. 3 PAuswG darf der Personalausweis (ebenso Reisepass nach PassG) nicht als Pfand oder Sicherheit eingezogen oder einbehalten werden. Der Pförtner darf das Dokument kurz zur Identitätsprüfung einsehen, muss es aber sofort wieder zurückgeben.',
  },
  354: {
    questionDe: 'Was unterscheidet den Einsatz in Zivilkleidung (z. B. Kaufhausdetektiv) von der Uniform- und Kennzeichnungspflicht nach §§ 18, 19 BewachV?',
    answerDe: 'Kaufhausdetektive arbeiten zur verdeckten Diebstahlserkennung in Zivilkleidung. Die sichtbare Namensschildpflicht nach § 18 Abs. 2 BewachV greift für bestimmte Tätigkeiten (z. B. Kontrollgänge im öffentlichen Raum, Diskotheken, Flüchtlingsunterkünfte); beim verdeckten Ladendetektiv im Geschäft entfällt die offene Uniform-/Schildpflicht während der Observation, jedoch muss der Dienstausweis stets mitgeführt und spätestens beim Eingreifen/Festnehmen vorgezeigt werden.',
  },
  355: {
    questionDe: 'Welche zivil- und strafrechtlichen Folgen drohen dem Sicherheitsmitarbeiter bei erheblichen Pflicht- oder Kompetenzüberschreitungen?',
    answerDe: 'Bei ungerechtfertigtem Festhalten, Gewaltanwendung oder Sachbeschädigung drohen strafrechtliche Verurteilung (z. B. §§ 223, 239, 240 StGB), Geld- oder Freiheitsstrafen, Verlust der waffen- und gewerberechtlichen Zuverlässigkeit (§ 34a GewO -> Berufsverbot!), arbeitsrechtliche Abmahnung/fristlose Kündigung sowie zivilrechtliche Schadensersatz- und Schmerzensgeldansprüche (§ 823 BGB).',
  },
  356: {
    questionDe: 'Was schreibt § 21 BewachV (sowie DGUV) zur Meldung besonderer Vorkommnisse, Waffen- oder Gewaltanwendung vor?',
    answerDe: 'Schusswaffengebrauch, erhebliche Sicherheitsvorfälle und besondere Feststellungen im Dienst müssen unverzüglich intern der Einsatzleitung sowie in den vorgeschriebenen Fällen (insb. Schusswaffengebrauch nach § 21 BewachV) der zuständigen Behörde / Polizei gemeldet und lückenlos schriftlich protokolliert werden.',
  },
  357: {
    questionDe: 'IHK-Prüfungsfall: Während eines Kontrollgangs vor einem Einkaufszentrum auf einem öffentlichen städtischen Fußweg beobachten Sie einen Falschparker. Welche Befugnisse haben Sie?',
    answerDe: 'Auf öffentlichem Straßenland besitzt ein privater Sicherheitsmitarbeiter keinerlei hoheitliche Befugnisse (keine Knöllchen, kein Abschleppauftrag ohne Behörde, keine Führerscheinwegnahme). Zulässig ist nur freundliches Hinweisen oder – bei Behinderung/Feuerwehrzufahrt – Verständigung von Ordnungsamt bzw. Polizei.',
    mcqOptionsDe: {
      A: 'Ein behördliches Verwarngeld ausstellen und den Führerschein des Fahrers als Pfand einziehen',
      B: 'Keine hoheitlichen Befugnisse auf öffentlichem Grund: lediglich freundlich ansprechen oder bei Gefährdung/Rettungswegblockade Ordnungsamt bzw. Polizei 110 informieren',
      C: 'Die Reifenventile öffnen, um die Luft abzulassen und den Fahrer zwei Stunden am Wegfahren zu hindern',
      D: 'Das blaue Warnlicht am Streifenwagen einschalten und ein Schild „Privatpolizei“ vorzeigen',
    },
  },
  358: {
    questionDe: 'IHK-Prüfungsfall: Welche Befugnisse zählen zu den „Jedermannsrechten“, auf die sich ein Sicherheitsmitarbeiter rechtmäßig stützen kann?',
    answerDe: 'Notwehr/Nothilfe (§ 32 StGB), rechtfertigender Notstand (§ 34 StGB / §§ 228, 904 BGB), vorläufige Festnahme auf frischer Tat (§ 127 Abs. 1 StPO) sowie zivilrechtliche Selbsthilfe (§ 229 BGB).',
    mcqOptionsDe: {
      A: 'Notwehr und Nothilfe (§ 32 StGB) sowie Notstandsrechte (§ 34 StGB / §§ 228, 904 BGB)',
      B: 'Vorläufige Festnahme bei frischer Straftat (§ 127 Abs. 1 StPO) und zivilrechtliche Selbsthilfe (§ 229 BGB)',
      C: 'Allgemeines Zwangsdurchsuchungsrecht für Taschen aller Passanten an einem öffentlichen Bahnhof',
      D: 'Recht zur eigenmächtigen Verhängung von 48 Stunden Untersuchungshaft im Wachraum',
    },
  },
  359: {
    questionDe: 'IHK-Prüfungsfall: Ihr Objektleiter verlangt von Ihnen, Ihre halbstündige Verspätung im Wachbuch mit Tipp-Ex zu überdecken und eine frühere Uhrzeit einzutragen. Was ist richtig?',
    answerDe: 'Urkunden-/Beweismanipulation im Wachbuch ist strengstens unzulässig! Wahrheitsgemäße Uhrzeit dokumentieren, niemals Tipp-Ex verwenden und etwaige Schreibfehler nur mit einem einfachen Strich lesbar streichen.',
    mcqOptionsDe: {
      A: 'Tipp-Ex benutzen oder die Seite herausreißen und eine manipulierte Uhrzeit eintragen',
      B: 'Fälschung klar ablehnen: die tatsächliche Uhrzeit wahrheitsgemäß eintragen und Versehen nur lesbar mit einem Strich streichen',
      C: 'Das Wachbuch grundsätzlich mit Bleistift führen, um Zeiten später bequem radieren zu können',
      D: 'Das Wachbuch einen Monat lang komplett leer lassen, um Fehler zu vermeiden',
    },
  },
  360: {
    questionDe: 'IHK-Prüfungsfall: In welchen Einsatzbereichen verpflichtet § 18 Abs. 2 BewachV den Sicherheitsmitarbeiter ausdrücklich zum sichtbaren Tragen eines Namens- oder Kennzeichnungsschildes?',
    answerDe: 'Die sichtbare Kennzeichnungspflicht gilt insbesondere bei Kontrollgängen im öffentlichen Verkehrsraum oder in Hausrechtsbereichen mit tatsächlichem öffentlichem Verkehr (Citystreife), beim Einlassdienst von Diskotheken sowie bei der Bewachung von Aufnahmeeinrichtungen und Gemeinschaftsunterkünften für Flüchtlinge.',
    mcqOptionsDe: {
      A: 'Bei Kontrollgängen im öffentlichen Raum / öffentlich zugänglichen Bereichen sowie im Türsteherdienst von Diskotheken',
      B: 'Bei Bewachungstätigkeiten in Aufnahmeeinrichtungen und Unterkünften für Asylbewerber und Flüchtlinge',
      C: 'Bei verdeckt operierenden Ladendetektiven während der geheimen Beobachtung im Verkaufsraum',
      D: 'In Deutschland ist das Tragen jeglicher Kennzeichnung oder Namensnummern am Dienstanzug generell verboten',
    },
  },
  361: {
    questionDe: 'IHK-Prüfungsfall: Ein Dieb stößt Sie bei der Flucht im Einkaufszentrum weg. Nachdem Sie ihn zu Boden gebracht haben und er reglos am Boden aufgibt, schlagen Sie ihm aus Wut mehrmals ins Gesicht. Rechtliche Bewertung?',
    answerDe: 'Nach der Aufgabe des Täters besteht kein gegenwärtiger rechtswidriger Angriff mehr! Die Schläge danach sind nicht mehr durch § 32 StGB gedeckt, sondern eine strafbare Körperverletzung (§ 223 StGB) und gefährden die § 34a-Zuverlässigkeit.',
    mcqOptionsDe: {
      A: 'Rechtmäßig als erzieherischer Denkzettel, damit der Täter künftig nicht wieder stiehlt',
      B: 'Strafbare Körperverletzung (§ 223 StGB), da kein gegenwärtiger Angriff mehr vorliegt; drohender Verlust der Zuverlässigkeit',
      C: 'Sicherheitsmitarbeiter genießen im Dienst volle Immunität bei Schlägen gegen Tatverdächtige',
      D: 'Zulässig, sofern der Filialleiter zuvor mündlich seine Zustimmung gegeben hat',
    },
  },
  362: {
    questionDe: 'IHK-Prüfungsfall: Nach Ihrem Ausscheiden aus der Sicherheitsfirma bietet Ihnen ein Wettbewerber oder Journalist Geld für interne Alarmcodes und Kontrollroutinen des früheren Kunden. Wie ist die Rechtslage?',
    answerDe: 'Die Geheimhaltungspflicht nach § 9 BewachV und dem GeschGehG besteht auch nach Ende des Arbeitsverhältnisses fort. Eine Weitergabe ist rechtswidrig und löst Straf- und Schadensersatzfolgen aus.',
    mcqOptionsDe: {
      A: 'Nach Kündigung dürfen die Daten verkauft werden, da kein Arbeitsverhältnis mehr besteht',
      B: 'Streng verboten: die Verschwiegenheitspflicht (§ 9 BewachV / GeschGehG) gilt auch nach Beendigung der Beschäftigung weiter',
      C: 'Die Veröffentlichung im Internet ist 14 Tage nach Beendigung des Vertrags erlaubt',
      D: 'Weitergabe an Journalisten ist zulässig, nur an Konkurrenzfirmen verboten',
    },
  },
  363: {
    questionDe: 'IHK-Prüfungsfall: Welche Aussagen zu Besucher-Personalausweisen (Pfandverbot) und Fundsachen im Objekt sind rechtlich korrekt?',
    answerDe: 'Der Personalausweis darf niemals als Pfand einbehalten werden (§ 1 PAuswG), sondern wird nur zur Ansicht kontrolliert; Fundsachen über 10 € müssen dokumentiert und gemäß § 978 BGB bei der Objekt-/Fundstelle abgegeben werden.',
    mcqOptionsDe: {
      A: 'Den Personalausweis des Besuchers niemals als Pfand einbehalten; nur zur Datenkontrolle einsehen und sofort zurückgeben',
      B: 'Fundsachen (> 10 €) lückenlos erfassen und gemäß § 978 BGB unverzüglich bei der Objektverwaltung bzw. Fundstelle abgeben',
      C: 'Gefundene Handys und Geldbörsen sechs Monate zu Hause lagern und bei Nichtabholung verkaufen',
      D: 'Jeden Lkw-Fahrer verpflichten, seinen Original-Reisepass während der gesamten Entladezeit an der Pforte zu hinterlegen',
    },
  },
  364: {
    questionDe: 'IHK-Prüfungsfall: Ein verärgerter Hotelgast filmt Sie in der Lobby aus nächster Nähe mit dem Handy und droht: „Heute Abend lacht ganz TikTok über dich!“ Wie reagieren Sie richtig?',
    answerDe: 'Das Veröffentlichen verstößt gegen § 22 KUG / DSGVO. Sie widersprechen der Aufnahme sachlich und klar, setzen ggf. per Hausrecht den Platzverweis durch, rufen bei Weigerung die Polizei 110 und fassen niemals sein Handy an.',
    mcqOptionsDe: {
      A: 'Dem Gast sofort das Smartphone aus der Hand reißen und am Boden zerstören',
      B: 'Der Aufnahme deutlich widersprechen, das Telefon nicht berühren, per Hausrecht das Verlassen des Bereichs verlangen und bei Weigerung Polizei 110 rufen',
      C: 'Den Gast drei Stunden im Keller mit Handfesseln einsperren, bis er den PIN zur Löschung verrät',
      D: 'Ihn weiter provozieren und nach Schichtende vor dem Hotel schlagen',
    },
  },

  // Kapitel 15: Aufgaben des Sicherheitsmitarbeiters (365–390)
  365: {
    questionDe: 'Was versteht man unter Objektschutz (Separatwachdienst) und welche Hauptaufgaben hat der Sicherheitsmitarbeiter dort?',
    answerDe: 'Objektschutz bedeutet die dauerhafte oder regelmäßige Bewachung eines bestimmten Objekts (Werk, Bank, Behörde, Rechenzentrum) gegen Einbruch, Diebstahl, Sabotage, Vandalismus und Brände. Kernaufgaben sind Zugangskontrollen, Schließ- und Kontrolldienste, Bedienung von Gefahrenmeldeanlagen, Schlüsselverwaltung und Alarmverfolgung.',
  },
  366: {
    questionDe: 'Worin unterscheiden sich der Revierwachdienst (Funkstreifendienst) und die Citystreife?',
    answerDe: 'Im Revierwachdienst betreut ein motorisierter Mitarbeiter nacheinander mehrere Objekte verschiedener Kunden (Kontrollfahrten, Auf-/Verschluss, Alarmverfolgung; meist Unterrichtung ausreichend). Die Citystreife führt Kontrollgänge in öffentlich zugänglichen Einkaufsbereichen, Passagen oder auf öffentlichen Straßen/Plätzen durch und erfordert zwingend die Sachkundeprüfung (§ 34a Abs. 1a Nr. 1 GewO) sowie sichtbare Kennzeichnung (§ 18 Abs. 2 BewachV).',
  },
  367: {
    questionDe: 'Welche besonderen Bewachungstätigkeiten erfordern gemäß § 34a Abs. 1a S. 2 GewO zwingend die erfolgreiche Sachkundeprüfung bei der IHK statt nur der 40-stündigen Unterrichtung?',
    answerDe: 'Die Sachkundeprüfung ist gesetzlich zwingend erforderlich für: 1. Kontrollgänge im öffentlichen Verkehrsraum oder Hausrechtsbereichen mit tatsächlich öffentlichem Verkehr (Citystreife), 2. Schutz vor Ladendieben (Kaufhausdetektiv), 3. Bewachungen im Einlassbereich gastgewerblicher Diskotheken (Türsteher), 4. Bewachungen in Flüchtlingsunterkünften in leitender Funktion und 5. Bewachungen von zugangsgeschützten Großveranstaltungen in leitender Funktion (sowie für Gewerbetreibende selbst).',
  },
  368: {
    questionDe: 'Welche Aufgaben erfüllt der Sicherheitsmitarbeiter beim Veranstaltungsschutz vor, während und nach der Veranstaltung?',
    answerDe: 'Vorher: Überprüfung von Fluchtwegen, Notausgängen, Feuerlöschern und Beschilderung sowie Abstimmung des Sicherheitskonzepts. Währenddessen: Einlass-, Ticket- und Taschenkontrollen (mit Einverständnis/Hausrecht), Jugendschutzkontrollen, Lenkung von Besucherströmen zur Panikvermeidung, Deeskalation und Freihalten von Rettungswegen. Nachher: sichere Abströmung der Besucher, Nachkontrolle der Halle und Schutz vor Sachbeschädigung.',
  },
  369: {
    questionDe: 'Welche speziellen Regeln und Beobachtungsprinzipien muss ein Kaufhausdetektiv (Ladendetektiv) vor dem Anhalten eines Verdächtigen zwingend einhalten?',
    answerDe: 'Goldene Regel ist die ununterbrochene Sichtbeobachtung (lückenlose Observation): 1. Beobachtung der Wegnahme und Einsteckens/Verbergens der Ware, 2. ununterbrochene Verfolgung bis hinter die Kassenlinie (Zueignungsabsicht bzw. Vollendung des Diebstahls § 242 StGB beim Verlassen des Kassenbereichs), 3. höfliches, ruhiges Ansprechen außerhalb des Sichtfelds anderer Kunden. Bei längerem Sichtverlust darf keine Festnahme/Beschuldigung erfolgen!',
  },
  370: {
    questionDe: 'Welche besonderen Anforderungen gelten beim Geld- und Werttransport sowie beim Schutz von Flüchtlingsunterkünften?',
    answerDe: 'Geld- und Werttransport (DGUV V23): gepanzerte Sonderfahrzeuge, klare Rollenverteilung (Bote, Sicherer, Fahrer im gesicherten Wagen), ständiges Variieren von Zeiten und Routen sowie ggf. Waffensachkunde. Flüchtlingsunterkünfte: Deeskalation, interkulturelle Sensibilität, strenge Wahrung der Menschenwürde (Art. 1 GG), Schutz besonders vulnerabler Gruppen, sichtbare Kennzeichnung (§ 18 Abs. 2 BewachV) sowie Sachkundeprüfung für leitende Kräfte.',
  },
  371: {
    questionDe: 'Welchen Zweck verfolgt der Erstrundgang bei Übernahme einer Nacht- oder Spätschicht?',
    answerDe: 'Der Erstrundgang bei Schichtbeginn dient als Zustandsaufnahme: Prüfung aller Außentüren, Fenster, Tore und Sicherheitsverschlüsse nach Betriebsschluss, Abschalten vergessener Wärmequellen/Kaffeemaschinen/Maschinen, Freihalten von Flucht- und Brandschutztüren sowie Kontrolle technischer Anlagen (Kühlung, Serverraum, Brandmeldezentrale), dokumentiert im Wachbuch.',
  },
  372: {
    questionDe: 'Welche taktischen und arbeitsschutzrechtlichen Regeln gelten für nächtliche Streifen- und Kontrollgänge?',
    answerDe: 'Routen und Uhrzeiten regelmäßig wechseln (keine Vorhersehbarkeit für Täter schaffen), keine festen Gewohnheiten („nicht Punkt 22:00 an derselben Tür“), Schutzausrüstung (Taschenlampe, Funk/Totmannschalter bei Alleinarbeit, PSA), vorsichtiges Herangehen an offene Türen oder verdächtige Geräusche, lückenlose Dokumentation über Wächterkontrollsysteme (Stechuhr/NFC).',
  },
  373: {
    questionDe: 'Welchen Beitrag leistet der Sicherheitsmitarbeiter während der Kontrollgänge zum Umwelt- und Energieschutz im Betrieb?',
    answerDe: 'Er fungiert als Auge des Betreibers nach Feierabend: Erkennen auslaufender Flüssigkeiten (Öl, Chemikalien, Wasserleckagen zur Vermeidung von Boden-/Gewässerschäden), Melden defekter Heizungs-/Klimaanlagen oder geöffneter Lagerfenster sowie das Abschalten unnötiger Verbraucher gemäß Dienstanweisung.',
  },
  374: {
    questionDe: 'Welche Aufgaben haben Sicherheitskräfte im Öffentlichen Personennahverkehr (ÖPNV / Bahnsicherheit)?',
    answerDe: 'Schutz von Fahrgästen und Fahr-/Prüfpersonal (z. B. Begleitung von Fahrkartenkontrolleuren), Durchsetzung von Beförderungsbedingungen und Hausrecht der Verkehrsbetriebe, frühzeitiges Deeskalieren bei Konflikten, Entgegenwirken gegen Vandalismus (Graffiti) sowie schnelle Hilfe bei medizinischen Notfällen oder Personen im Gleisbereich unter Beachtung von Stromgefahren (Oberleitung/Stromschiene).',
  },
  375: {
    questionDe: 'Worin liegen die Kernaufgaben im Empfangs- und Conciergedienst und wie vereint der Mitarbeiter Service mit Sicherheit?',
    answerDe: 'Der Empfang ist die Visitenkarte des Unternehmens. Der Mitarbeiter verbindet freundliche Besucherbetreuung (Begrüßung, Ausweisausgabe, Auskunft, Telefonzentrale) mit konsequenter Wachsamkeit (keinen Einlass ohne Anmeldung/Begleitung, Erkennen von Social Engineering, Überwachung der Meldetechnik und Alarmpläne).',
  },
  376: {
    questionDe: 'Welche Aufgaben hat ein Personenschützer (Bodyguard) im privaten Bereich?',
    answerDe: 'Schutz von Leben, Gesundheit und Bewegungsfreiheit gefährdeter Privatpersonen (Manager, Politiker, Künstler) im Rahmen der Jedermannsrechte. Ca. 90 % der Arbeit ist präventive Planung: Voraufklärung von Wegen, Hotels und Ausweichrouten, Post-/Fahrzeugcheck, lückenlose 360°-Begleitung und rasches Ausweichen im Fahrzeug bei akuter Gefahr.',
  },
  377: {
    questionDe: 'Wie verläuft eine professionelle Alarmverfolgung (Interventionsdienst) bei Auslösung einer Einbruchmeldeanlage (EMA) nachts?',
    answerDe: 'Einsatzkleidung, Warnweste, Lampe, Funk/Mobiltelefon bereithalten; vorsichtige Annäherung und Außenhautkontrolle des Gebäudes (Fenster, Türen, Dachkanten, fremde Fahrzeuge). Liegen keine Einbruchsspuren vor: vorsichtiges Begehen unter ständiger NSL-Meldung, Prüfen der Zentrale, Scharfschalten und Protokollieren. Bei Einbruchsspuren oder Tätern im Objekt: NICHT allein hineingehen – in sicherem Abstand bleiben und sofort Polizei 110 rufen!',
  },
  378: {
    questionDe: 'Welche Kontrollen übernimmt der Werkschutz bei der Lkw-Abfertigung an der Logistikpforte eines Industrieunternehmens?',
    answerDe: 'Registrierung des Fahrers samt Unterweisung zu Werksverkehr und PSA, Kontrolle von Frachtpapieren und Sicherheitsplomben (Plomben-Nr.-Abgleich), Prüfung von Ausgangsscheinen (Lieferschein) zur Verhinderung unbefugten Güterabflusses sowie Verwiegen und geordnetes Einweisen zur Vermeidung von Gabelstaplerunfällen.',
  },
  379: {
    questionDe: 'Wie geht der Werkschutz professionell bei dem Verdacht auf Mitarbeiterdiebstahl im Kundenbetrieb vor?',
    answerDe: 'Keine öffentlichen Beschuldigungen oder Gerüchte vor Kollegen verbreiten (Strafbarkeit nach § 186 StGB Üble Nachrede droht!). Beweise objektiv und rechtskonform sichern, Datenschutz sowie Mitbestimmungsrechte des Betriebsrats beachten, Ergebnisse vertraulich an die Werks-/Sicherheitsleitung berichten und keine unzulässige gewaltsame Spinddurchsuchung durchführen.',
  },
  380: {
    questionDe: 'Wie unterscheiden sich die Luftsicherheitsaufgaben nach § 5 LuftSiG gegenüber § 8 / § 9 LuftSiG (bzw. § 34a GewO) am Flughafen?',
    answerDe: 'Luftsicherheitsassistenten nach § 5 LuftSiG werden von der Bundes- oder Landespolizei als Beliehene mit hoheitlichen Befugnissen zur Passagier- und Gepäckkontrolle eingesetzt. Private Sicherheitskräfte nach §§ 8/9 LuftSiG bzw. § 34a GewO bewachen Flughafenzäune, Frachtbereiche oder Personaltore ohne Hoheitsgewalt über Reisende; alle benötigen eine Zuverlässigkeitsüberprüfung (ZÜP nach § 7 LuftSiG).',
  },
  381: {
    questionDe: 'Welche Inhalte regelt ein abgestimmtes Sicherheitskonzept bei Großveranstaltungen zwischen Veranstalter, Sicherheitsdienst, Polizei und Feuerwehr?',
    answerDe: 'Genehmigte maximale Besucherzahl (Kapazitätsgrenze), Evakuierungs- und Entfluchtungswege, Aufstellflächen für Feuerwehr/Rettungsdienst, Standort der gemeinsamen Koordinierungsstelle, Liste verbotener Gegenstände (Waffen, Glasflaschen, Pyrotechnik) sowie eindeutige Kommunikationswege zwischen Veranstalter, Einsatzleitung Sicherheit, Polizei, Feuerwehr und Sanitätsdienst.',
  },
  382: {
    questionDe: 'Welche Rolle spielt der Sicherheitsmitarbeiter bei der Abwehr von Wirtschaftsspionage und Industriesabotage?',
    answerDe: 'Schutz sensibler Entwicklungs- und Produktionsbereiche durch konsequentes Fotografierverbot, Verhinderung von unbefugtem Zugang zu IT-Arbeitsplätzen oder USB-Ports durch Besucher/Handwerker, Kontrolle der Clean-Desk-Policy (keine offenen vertraulichen Unterlagen/Schlüssel nach Feierabend) sowie lückenlose Begleitung von Fremdfirmen in Hochsicherheitszonen.',
  },
  383: {
    questionDe: 'IHK-Prüfungsfall: Für welche der genannten Tätigkeiten genügt die 40-stündige Unterrichtung und wo ist zwingend die Sachkundeprüfung nach § 34a GewO erforderlich?',
    answerDe: 'Für den Pfortendienst in einem nicht öffentlich zugänglichen Industriebetrieb reicht die Unterrichtung; dagegen verlangen Kaufhausdetektiv, Diskotheken-Türsteher und Citystreife zwingend die bestandene Sachkundeprüfung (ebenso Gewerbetreibende im Bewachungsgewerbe).',
    mcqOptionsDe: {
      A: 'Ein Pförtner an einer geschlossenen Industriepforte ohne Publikumsverkehr darf mit der 40-stündigen Unterrichtung arbeiten',
      B: 'Kaufhausdetektive in Zivil, Diskotheken-Türsteher und Citystreifen im öffentlichen Raum benötigen zwingend die Sachkundeprüfung',
      C: 'Kaufhausdetektiven genügt die Unterrichtung, sofern sie zivile Alltagskleidung tragen',
      D: 'Auch ein selbstständiger Bewachungsunternehmer benötigt keine Sachkundeprüfung, wenn seine Angestellten unterrichtet sind',
    },
  },
  384: {
    questionDe: 'IHK-Prüfungsfall: Als Kaufhausdetektiv beobachten Sie eine Kundin, wie sie ein Parfüm in ihren Rucksack steckt. In der Bekleidungsabteilung verschwindet sie 30 Sekunden hinter einer breiten Säule (leerer Karton liegt dort) und passiert danach die Kasse ohne zu zahlen. Ihr Verhalten?',
    answerDe: 'Durch den 30-sekündigen Sichtverlust könnte sie das Parfüm hinter der Säule abgelegt haben! Es darf keine voreilige Festnahme oder Zwangseinwirkung erfolgen – zuerst hinter der Säule nachsehen und äußerst vorsichtig vorgehen.',
    mcqOptionsDe: {
      A: 'Sofort hinterherrennen, die Frau vor dem Laden gewaltsam festnehmen und zu Boden drücken',
      B: 'Wegen des 30-sekündigen Sichtverlusts könnte sie die Ware hinter der Säule abgelegt haben – keine Festnahme ins Blaue hinein, zuerst an der Säule prüfen und äußerst behutsam vorgehen',
      C: 'Ihr den Rucksack vom Rücken reißen und den Inhalt mitten auf der Straße entleeren',
      D: 'Über die Laden-Lautsprecheranlage warnen, dass eine Ladendiebin das Geschäft verlässt',
    },
  },
  385: {
    questionDe: 'IHK-Prüfungsfall: Auf einer nächtlichen Revierfahrt begehen Sie um 01:30 Uhr eine Werkhalle. Sie riechen plötzlich starken Gasgeruch und hören ein Zischen an einer Leitung. Sofortmaßnahme?',
    answerDe: 'Gas-Luft-Gemisch ist hochexplosiv! Keinen einzigen Lichtschalter, Telefon, Funkgerät oder Feuerzeug im Gebäude betätigen (Zündfunken!), Gebäude sofort verlassen und aus sicherer Entfernung im Freien 112 + Gasversorger anrufen.',
    mcqOptionsDe: {
      A: 'Alle Deckenlichter im Flur anschalten und direkt im Raum mit dem Mobiltelefon anrufen, um die Stelle zu finden',
      B: 'Keine elektrischen Schalter, Telefone oder Feuerzeuge betätigen, Gebäude sofort ins Freie verlassen und aus sicherer Entfernung 112 sowie den Gasnotdienst verständigen',
      C: 'Mit dem Taschenfeuerzeug die Rohrleitung ableuchten, um das Leck zu orten',
      D: 'Mit dem Aufzug schnell in die Tiefgarage fahren und dort die Fenster schließen',
    },
  },
  386: {
    questionDe: 'IHK-Prüfungsfall: Während Ihrer Schicht in einer Flüchtlingsunterkunft entsteht ein heftiger Streit zwischen zwei Bewohnern; verängstigte Familien stehen daneben. Welches Vorgehen ist professionell?',
    answerDe: 'Ruhig, neutral und deeskalierend ohne jede Diskriminierung eingreifen (Art. 1 GG), Frauen und Kinder vorrangig in Sicherheit bringen, Kennzeichnung sichtbar tragen (§ 18 Abs. 2 BewachV) und bei Gewalt Schichtleitung bzw. Polizei 110 rufen.',
    mcqOptionsDe: {
      A: 'Ruhig, unparteiisch und deeskalierend eingreifen sowie verängstigte Familien und Kinder räumlich abschirmen',
      B: 'Kennzeichnungsschild (§ 18 Abs. 2 BewachV) sichtbar tragen und Einsatzleitung bzw. bei Eskalation die Polizei 110 verständigen',
      C: 'Beide Bewohner sofort mitten in der Nacht auf die Straße werfen und ihre Ausweise zerreißen',
      D: 'Partei für eine Nationalität ergreifen und den anderen Bewohner lautstark beleidigen',
    },
  },
  387: {
    questionDe: 'IHK-Prüfungsfall: Bei einem Großkonzert ist die zulässige Hallenkapazität voll erreicht, obwohl draußen noch 300 Ticketinhaber drängeln; zudem stehen Taschen vor einem Notausgang. Sofortmaßnahmen?',
    answerDe: 'Einlassstopp sofort über die Einsatzleitung verhängen, um Überfüllung und Massenpanik zu verhindern, und den Notausgang unverzüglich komplett von Taschen und Personen räumen lassen.',
    mcqOptionsDe: {
      A: 'In Abstimmung mit der Einsatzleitung einen sofortigen Einlassstopp an den Schleusen verhängen, um die Kapazitätsgrenze einzuhalten',
      B: 'Den blockierten Notausgang sofort von allen Taschen und Personen befreien und dauerhaft frei halten',
      C: 'Alle Tore öffnen und auch die 300 Personen über die zulässige Höchstgrenze hinaus hineinlassen',
      D: 'Die Notausgänge mit Ketten und Vorhängeschlössern sichern, damit niemand unberechtigt von außen hineinkommt',
    },
  },
  388: {
    questionDe: 'IHK-Prüfungsfall: Welche Grundregeln gelten im Geld- und Werttransport nach DGUV Vorschrift 23 (§ 24)?',
    answerDe: 'Fahrtzeiten und Routen ständig wechseln (Unberechenbarkeit), Sicherung des Geldboten durch einen aufmerksamen Begleiter während der Fahrer im verschlossenen Fahrzeug bleibt, und bei bewaffnetem Überfall absoluter Vorrang des Menschenlebens vor Geldverlust.',
    mcqOptionsDe: {
      A: 'Anlieferzeiten und Fahrtrouten täglich variieren, Geldboten durch einen sichernden Kollegen decken und Fahrer im verschlossenen Fahrzeug belassen',
      B: 'Bei einem echten bewaffneten Überfall haben Menschenleben oberste Priorität – keine waghalsigen Schusswechsel um Geldkoffer riskieren',
      C: 'Den Geldtransporter mit laufendem Motor und offenen Türen vor der Bank abstellen',
      D: 'Jeden Tag exakt um 09:00 Uhr dieselbe Gasse anfahren, damit der Ablauf routiniert bleibt',
    },
  },
  389: {
    questionDe: 'IHK-Prüfungsfall: An der Lieferpforte eines Werks bemerken Sie bei einem Lkw mit wertvoller Fracht, dass die Sicherheitsplombe des Aufliegers gebrochen ist und eine abweichende Nummer in den Papieren steht. Ihr Handeln?',
    answerDe: 'Manipulation oder Transportdiebstahl möglich! Entladung stoppen, Fahrzeug unter Beobachtung im Wartebereich halten, Plombenbruch/Abweichung sofort dokumentieren und Logistik-/Sicherheitsleitung informieren.',
    mcqOptionsDe: {
      A: 'Entladung sofort freigeben und die Nummer in den Frachtpapieren heimlich angleichen',
      B: 'Entladung zurückstellen, Lkw gesichert unter Aufsicht abstellen, Abweichung/Bruch dokumentieren und umgehend Logistik sowie Einsatzleitung melden',
      C: 'Die beschädigte Plombe in den Müll werfen und ohne Meldung eine neue anbringen lassen',
      D: 'Den Fahrer sofort wegen Ladungsdiebstahls fesseln und in die Pförtnerloge sperren',
    },
  },
  390: {
    questionDe: 'IHK-Prüfungsfall: Auf einer Citystreife nach Ladenschluss beobachten Sie zwei Jugendliche, die an eine glatte Ladenfassade großflächig Graffiti sprühen. Rechtliche und praktische Bewertung?',
    answerDe: 'Graffiti auf fremder Fassade ist eine vorsätzliche Sachbeschädigung (§ 303 Abs. 2 StGB). Sie melden die Tat sofort der Polizei 110 mit Personenbeschreibung/Fluchtrichtung; eine vorläufige Festnahme nach § 127 Abs. 1 StPO kommt nur in Betracht, wenn sie sicher und verhältnismäßig möglich ist.',
    mcqOptionsDe: {
      A: 'Es handelt sich um eine frische Sachbeschädigung (§ 303 StGB); Polizei 110 mit Beschreibung und Richtung sofort verständigen',
      B: 'Eine vorläufige Festnahme (§ 127 Abs. 1 StPO) ist nur zulässig, wenn sie ohne Eigengefährdung und verhältnismäßig gelingt; sonst sicher beobachten und Polizei einweisen',
      C: 'Als Citystreife dürfen Sie den Jugendlichen zur direkten Strafe Farbe auf die eigene Kleidung sprühen',
      D: 'Graffiti nach Ladenschluss ist in Deutschland eine straflose Kunstform ohne Handlungsbedarf',
    },
  },

  // Kapitel 16: Zutrittskontrolle (391–416)
  391: {
    questionDe: 'Was versteht man unter Zutritts- und Einlasskontrolle und welche Sicherheitsziele verfolgt sie?',
    answerDe: 'Zutritts- und Einlasskontrollen überprüfen anhand von Berechtigungen (Ausweis, Ticket, PIN, Liste), wer ein Grundstück, ein Gebäude oder bestimmte Sicherheitszonen betreten oder befahren darf. Ziele sind Schutz vor Einbruch, Diebstahl, Spionage, Sabotage, Gefahrenstoffen und Überfüllung.',
  },
  392: {
    questionDe: 'Welche zwingende rechtliche Voraussetzung gilt für eine Taschen- oder Personenkontrolle durch private Sicherheitskräfte?',
    answerDe: 'Private Sicherheitskräfte haben kein gesetzliches Zwangs-Durchsuchungsrecht! Eine Einsichtnahme in Taschen oder ein Abtasten der Oberbekleidung ist ausschließlich mit vorheriger freiwilliger Einwilligung des Betroffenen zulässig (z. B. vereinbart über AGB/Hausordnung oder Betriebsvereinbarung). Verweigert die Person die Kontrolle, wird sie nicht berührt, sondern der Zutritt mittels Hausrecht verweigert.',
  },
  393: {
    questionDe: 'Welche zwingende Regel gilt hinsichtlich des Geschlechts bei der freiwilligen körperlichen Kontrolle (Abtasten)?',
    answerDe: 'Aus Gründen des Persönlichkeitsrechts und der Menschenwürde (Art. 1, 2 GG) darf eine körperliche Nachschau bzw. ein Abtasten (auch mit Zustimmung) grundsätzlich nur durch eine Sicherheitskraft desselben Geschlechts erfolgen (Frau kontrolliert Frau, Mann kontrolliert Mann). Ist keine gleichgeschlechtliche Kraft vor Ort, beschränkt man sich auf Blickkontrolle geöffneter Taschen oder Handmetalldetektor.',
  },
  394: {
    questionDe: 'Welche Schritte umfasst ein ordnungsgemäßes Besucher- und Fremdfirmenmanagement an der Werkspforte?',
    answerDe: '1. Anmeldung und Abgleich mit erwartetem Besuch/Gastgeber, 2. Identitätsprüfung durch Einsicht in den Ausweis (ohne Einbehalt als Pfand!), 3. datenschutzkonforme Registrierung (Einzelscheine statt offener Listen!), 4. Sicherheitsunterweisung (ggf. PSA) und Ausgabe eines unterscheidbaren Besucherausweises, 5. Abholung/Begleitung durch Gastgeber und lückenlose Abmeldung bei Ausgang.',
  },
  395: {
    questionDe: 'Worin unterscheidet sich die Einlasskontrolle rechtlich von der Ausgangs- oder Torkontrolle bei eigenen Mitarbeitern?',
    answerDe: 'Bei der Einlasskontrolle steuert der Betreiber den freien Zutritt über Hausrecht und vertragliche Einlassbedingungen (verweigert bei Nichtmitwirkung einfach den Eintritt). Bei der Ausgangs-/Torkontrolle von Mitarbeitern sind zusätzlich das Arbeitsrecht und die zwingende Mitbestimmung des Betriebsrats (§ 87 Abs. 1 Nr. 1 BetrVG) einzuhalten; verweigert ein Mitarbeiter die Taschenkontrolle beim Gehen ohne konkrete frische Diebstahlstat (§ 127 StPO), darf er nicht physisch aufgehalten werden.',
  },
  396: {
    questionDe: 'Was ist bei der Fahrzeugkontrolle an einer Betriebspforte rechtlich und praktisch zu beachten?',
    answerDe: 'Bei einfahrenden Fahrzeugen wird die Zufahrtsberechtigung/Ladung kontrolliert; bei ausfahrenden Fahrzeugen erfolgt je nach Dienstanweisung und Betriebsvereinbarung ein Blick in den Kofferraum bzw. die Ladefläche (den Fahrer selbst den Deckel öffnen lassen, niemals eigenmächtig im privaten Handschuhfach wühlen!). Verweigert der Fahrer ohne frischen Diebstahlverdacht, erfolgt kein Zwang, sondern Dokumentation und Meldung an die Werksleitung.',
  },
  397: {
    questionDe: 'Was versteht man unter Tailgating (Huckepack-Verfahren) und wie wird dieses Zutrittsrisiko verhindert?',
    answerDe: 'Tailgating bedeutet das unbemerkte Mit-Durchschlüpfen einer unbefugten Person dicht hinter einem berechtigten Mitarbeiter durch eine geöffnete Tür oder Schranke. Abwehr: technisch durch Vereinzelungsanlagen/Drehkreuze und Lichtschranken sowie organisatorisch/menschlich durch Schulung („keine Tür für Fremde aufhalten“), Höflichkeitsschranke „Darf ich Ihren Ausweis sehen?“ und Sichtkontrolle an der Pforte.',
  },
  398: {
    questionDe: 'Wie reagiert der Sicherheitsmitarbeiter richtig, wenn bei einer freiwilligen Einlasskontrolle verbotene Gegenstände entdeckt werden?',
    answerDe: '1. Gegenstände nach AGB/Hausordnung (z. B. Glasflaschen, Regenschirme, Alkohol) werden je nach Organisation verwahrt oder der Zutritt damit verwehrt; der Besucher darf entscheiden, ob er sie draußen lässt oder abgibt. 2. Bei gesetzlich streng verbotenen Waffen/Gegenständen (z. B. verbotene Messer nach § 42 / § 42a WaffG, Schlagringe, echte illegale Schusswaffen): Ruhe bewahren, Eigensicherung, Zutritt strikt verweigern, ggf. Polizei 110 rufen (Verbotenes nicht ungesichert behalten oder herausfordern).',
  },
  399: {
    questionDe: 'Welche Vorteile und Gefahren birgt der Einsatz von Metalldetektoren (Torsonden, Handsonden) und Röntgengeräten (X-Ray)?',
    answerDe: 'Vorteile: berührungslose, schnelle Detektion gefährlicher Metallgegenstände oder verborgener Gegenstände im Gepäck. Risiken/Regeln: Personen mit Herzschrittmachern oder bestimmten medizinischen Implantaten (sowie teils Schwangere je nach System) dürfen wegen elektromagnetischer Felder NICHT durch die Metalldetektor-Schleuse oder mit der Handsonde direkt abgesucht werden -> Umleitung und alternative manuelle Kontrolle durch gleichgeschlechtliche Kraft; bei X-Ray gilt Strahlenschutzverordnung.',
  },
  400: {
    questionDe: 'Welche Regeln gelten beim Erscheinen von Diplomaten oder Polizei-/Behördenvertretern in Zivil an der Pforte?',
    answerDe: 'Polizei, Feuerwehr oder Gewerbeaufsicht in Zivil müssen sich zwingend durch Vorzeigen ihres Dienstausweises legitimieren; bei Zweifeln erfolgt ein Rückruf bei der zuständigen Polizeidienststelle (110). Diplomaten genießen Immunität (kein Festhalten nach § 127 StPO und keine Zwangsdurchsuchung!), jedoch gilt auf reinem Privatgrundstück weiterhin das Einvernehmen/Hausrecht der Botschafts-/Objektleitung nach Dienstanweisung.',
  },
  401: {
    questionDe: 'Welche Grundsätze gelten bei der Schlüssel- und Ausweisverwaltung in der Pforte?',
    answerDe: 'Schlüssel und Zugangskarten dürfen nur gegen Unterschrift an nachweislich berechtigte Personen ausgegeben und müssen lückenlos (wer, wann, welcher Schlüssel, Rückgabezeit) im Schlüsselbuch/elektronischen Schlüsselschrank erfasst werden. Verlorene General-/Objektschlüssel müssen unverzüglich der Einsatzleitung gemeldet werden; Schlüssel dürfen niemals unbeschrieben am offenen Brett hängen oder unbemerkt weitergegeben werden.',
  },
  402: {
    questionDe: 'Worauf achtet das Sicherheitspersonal bei der Echtheitsprüfung von Tickets, Ausweisen und Einlasspässen?',
    answerDe: 'Kontrolle von Sicherheitsmerkmalen (Hologramme, Wasserzeichen, UV-Merkmale, Prägungen, Fotoabgleich, Gültigkeitsdatum, Stempel/Unterschrift) und Erkennen möglicher Manipulationen oder Mehrfachkopien von QR-/Barcodes bei elektronischen Drehkreuzen.',
  },
  403: {
    questionDe: 'Welche gesetzlichen Voraussetzungen müssen nach dem Betriebsverfassungsgesetz (§ 87 BetrVG) für regelmäßige Torkontrollen bei Arbeitnehmern erfüllt sein?',
    answerDe: 'Regelmäßige oder stichprobenartige Taschen-/Fahrzeugkontrollen der eigenen Belegschaft am Werkstor betreffen die Ordnung des Betriebs (§ 87 Abs. 1 Nr. 1 BetrVG) und erfordern zwingend eine vorherige Zustimmung des Betriebsrats mittels schriftlicher Betriebsvereinbarung (Gleichbehandlung durch Zufallsgenerator inklusive Leitungskräfte, diskrete Durchführung, kein Zwang).',
  },
  404: {
    questionDe: 'Wie funktionieren Social-Engineering-Versuche am Werkstor und wie wehrt das Pfortenpersonal sie ab?',
    answerDe: 'Angreifer nutzen Hilfsbereitschaft, Zeitdruck oder vorgetäuschte Autorität („Ich muss die Server sofort prüfen, der Chef weiß Bescheid – wenn Sie mich aufhalten, fliegen Sie!“ oder tragen schwere Pakete). Abwehr: Ausnahmslose Anwendung der Vorschriften für alle (auch vermeintliche Führungskräfte), Verifizierung ausschließlich über intern bekannte Rückrufnummern (nicht die Nummer des Besuchers!), höfliche aber kompromisslose Verweigerung ohne Berechtigung.',
  },
  405: {
    questionDe: 'Wo verläuft die Grenze zwischen zulässiger Zutrittsverweigerung und verbotener Diskriminierung nach dem Allgemeinen Gleichbehandlungsgesetz (AGG)?',
    answerDe: 'In öffentlich zugänglichen Betrieben (Diskotheken, Geschäfte, Gastronomie) schränkt § 19 AGG das Hausrecht ein: Eine Abweisung wegen Rasse, ethnischer Herkunft, Geschlecht, Religion, Behinderung, Alter oder sexueller Identität ist gesetzlich verboten! Eine Abweisung aus objektiven, sachlichen Sicherheits- oder Ordnungsgründen (z. B. starke Alkoholisierung, Aggressivität, Verstoß gegen Dresscode, Erreichen der Kapazitätsgrenze, verbotene Gegenstände) ist dagegen rechtmäßig.',
  },
  406: {
    questionDe: 'Welche altersbezogenen Einlasspflichten ergeben sich aus dem Jugendschutzgesetz (JuSchG) an der Tür von Diskotheken und Veranstaltungen?',
    answerDe: 'Nach § 5 JuSchG ist Kindern und Jugendlichen unter 16 Jahren die Anwesenheit bei öffentlichen Tanzveranstaltungen ohne personensorgeberechtigte oder erziehungsbeauftragte Person grundsätzlich nicht gestattet. Jugendliche ab 16 bis unter 18 Jahren dürfen ohne Begleitung bis maximal 24:00 Uhr bleiben (länger nur mit Personensorgeberechtigtem oder wirksamer schriftlicher Erziehungsbeauftragung / „Muttizettel“ plus volljähriger Begleitperson).',
  },
  407: {
    questionDe: 'Woran erkennt man verdächtige Postsendungen oder Pakete (Brief-/Paketbomben) und wie lautet das korrekte Notfallverhalten?',
    answerDe: 'Warnsignale: kein oder fehlerhafter Absender, übermäßige Beschriftung „Streng vertraulich / nur persönlich“, Ölflecken oder Verfärbungen, seltsamer Geruch, fühlbare Drähte/Batterien, ungewöhnliches Gewicht oder überfrankiert. Verhalten: Nicht öffnen, nicht schütteln, nicht ins Wasser tauchen! Sendung liegen lassen, Raum räumen und absperren, Polizei 110 rufen.',
  },
  408: {
    questionDe: 'Wie wird der Aufenthalt betriebsfremder Lkw-Fahrer und Lieferanten auf großen Werksgeländen sicher gesteuert?',
    answerDe: 'Aus Gründen des Arbeitsschutzes (UVV), Geheimhaltungs- und Diebstahlschutzes dürfen fremde Fahrer nicht frei durch Produktionshallen laufen: Einrichtung abgegrenzter Warte-/Aufenthaltszonen, Ausgabe farblich markierter Lieferantenausweise, verständliche (teils mehrsprachige) Sicherheitsmerkblätter mit Piktogrammen sowie Erfassung von Ein- und Ausfahrzeiten.',
  },
  409: {
    questionDe: 'IHK-Prüfungsfall: Am Einlass eines großen Konzerts (Taschenkontrolle per AGB angekündigt) weigert sich eine Besucherin, ihre Handtasche öffnen zu lassen: „Sie sind kein Polizist!“ Wie reagieren Sie?',
    answerDe: 'Sie hat recht, dass kein Zwangs-Durchsuchungsrecht besteht. Sie berühren ihre Tasche niemals gewaltsam, sondern verweisen höflich auf das Hausrecht und verweigern ohne freiwillige Nachschau konsequent den Zutritt.',
    mcqOptionsDe: {
      A: 'Ihr die Tasche gewaltsam von der Schulter reißen und den Reißverschluss vor allen Gästen aufziehen',
      B: 'Die Weigerung akzeptieren, die Tasche niemals berühren und ihr mittels Hausrecht ruhig und bestimmt den Einlass verwehren',
      C: 'Sie nach § 127 Abs. 1 StPO festnehmen und fesseln, weil sie bestimmt eine Waffe dabeihat',
      D: 'Sie ohne jegliche Prüfung einlassen, damit sich die Schlange nicht staut',
    },
  },
  410: {
    questionDe: 'IHK-Prüfungsfall: An der Werkspforte leuchtet bei einem Mitarbeiter nach Dienstende das Zufallssignal der betriebsvereinbarten Torkontrolle auf. Er weigert sich und geht ohne Kontrolle auf die Straße, ohne dass Sie einen Diebstahl gesehen haben. Was tun Sie?',
    answerDe: 'Ohne frische beobachtete Straftat (§ 127 StPO) gibt die Betriebsvereinbarung kein Recht auf körperlichen Zwang oder Einsperren! Sie lassen ihn gehen, dokumentieren die Verweigerung genau und melden dies sofort an Werks-/Personal- und Sicherheitsleitung.',
    mcqOptionsDe: {
      A: 'Das Tor schließen, ihn gewaltsam festhalten und im Wachraum bis zum Öffnen der Tasche einsperren',
      B: 'Ihn ungehindert ohne Körperkontakt gehen lassen, den Vorgang exakt protokollieren und sofort Vorgesetzte sowie Werkleitung informieren',
      C: 'Pfefferspray einsetzen und ihn zu Boden bringen, weil er das Zufallsprinzip ignoriert hat',
      D: 'Die Verweigerung vertuschen und das Protokoll des Zufallsgenerators löschen',
    },
  },
  411: {
    questionDe: 'IHK-Prüfungsfall: An der Pforte verlangt ein Besucher seinen Personalausweis nach dem kurzen Vorzeigen sofort zurück; außerdem möchte ein Gast im offenen Besucherbuch blättern, ob ein Konkurrent morgens im Haus war. Was ist richtig?',
    answerDe: 'Der Ausweis darf nie als Pfand einbehalten werden (§ 1 PAuswG). Zudem verbietet die DSGVO die Offenlegung anderer Besuchernamen durch offene Listen – stattdessen Einzelerfassungsblätter oder verdeckte Liste nutzen.',
    mcqOptionsDe: {
      A: 'Den Personalausweis nach bloßer Sichtprüfung sofort an den Besucher zurückgeben und niemals als Pfand behalten',
      B: 'Daten früherer Besucher gemäß DSGVO schützen (Einzelformulare/Sichtschutz) und keine Auskunft über andere Besucher erteilen',
      C: 'Reisepass oder Personalausweis verpflichtend während der gesamten Besuchszeit in der Schublade einschließen',
      D: 'Das offene Besucherbuch auslegen, damit jeder Gast frühere Konkurrenten einsehen kann',
    },
  },
  412: {
    questionDe: 'IHK-Prüfungsfall: Bei der Einlasskontrolle mit Metalldetektortor legt ein Gast einen medizinischen Ausweis vor, dass er einen Herzschrittmacher trägt. Ihr Vorgehen?',
    answerDe: 'Elektromagnetische Felder von Tor- und Handsonden können Herzschrittmacher gefährlich stören! Gast sofort an der Schleuse vorbeileiten (Umgehungsweg) und nach Einwilligung durch eine gleichgeschlechtliche Kraft vorsichtig manuell/visuell kontrollieren.',
    mcqOptionsDe: {
      A: 'Ihn zwingen, zügig durch die Metalldetektor-Schleuse zu gehen und mit der Handsonde über die Brust fahren',
      B: 'Ihn von Schleuse und Handsonde ausnehmen, seitlich vorbeileiten und alternativ mit Einwilligung gleichgeschlechtlich manuell/visuell prüfen',
      C: 'Ihm generell den Besuch des Konzerts verbieten, da Menschen mit Herzschrittmacher nicht zugelassen sind',
      D: 'Das medizinische Gerät an der Pforte abnehmen lassen und an der Garderobe abgeben',
    },
  },
  413: {
    questionDe: 'IHK-Prüfungsfall: Am Einlass einer Diskothek erscheint erst ein stark alkoholisierter, pöbelnder Gast und danach ein ruhiger, korrekt gekleideter Gast mit ausländischem Namen und gültigem Ticket. Was gilt rechtlich (Hausrecht & AGG)?',
    answerDe: 'Die Abweisung des stark Betrunkenen/Aggressiven ist aus Sicherheitsgründen rechtmäßig. Die Abweisung eines ruhigen Gastes allein wegen seiner ethnischen Herkunft verstößt jedoch gegen § 19 AGG!',
    mcqOptionsDe: {
      A: 'Die Abweisung des stark alkoholisierten und pöbelnden Gastes ist aus objektiven Sicherheitsgründen rechtmäßig',
      B: 'Einen ruhigen, regelkonformen Gast wegen seiner Herkunft oder Hautfarbe abzuweisen, ist gemäß § 19 AGG rechtswidrige Diskriminierung',
      C: 'Der Türsteher darf im Rahmen des Hausrechts jede beliebige Person wegen ihrer Herkunft ohne Grund abweisen',
      D: 'Man muss den aggressiven Betrunkenen einlassen und den ausländischen ruhigen Gast abweisen',
    },
  },
  414: {
    questionDe: 'IHK-Prüfungsfall: Bei einer Stadien-Einlasskontrolle fällt die weibliche Sicherheitskraft an der Damen-Kontrollspur für 10 Minuten aus, während die Schlange länger wird. Was darf der männliche Kollege tun?',
    answerDe: 'Männer dürfen Frauen keinesfalls körperlich abtasten! Sofort weibliche Ersatzkraft rufen und vorübergehend nur Sichtkontrolle der selbst geöffneten Taschen oder kontaktfreie Detektorprüfung ohne Berührung durchführen.',
    mcqOptionsDe: {
      A: 'Der männliche Mitarbeiter tastet die Frauen einfach zügig ab, um Wartezeiten abzubauen',
      B: 'Sofort eine weibliche Ersatzkraft anfordern und zwischenzeitlich ohne jede Berührung nur selbst geöffnete Taschen sichten oder Detektor nutzen',
      C: 'Alle Kontrollen für 10 Minuten aussetzen und Flaschen sowie Taschen ungeprüft einlassen',
      D: 'Die Besucherinnen beleidigen und grundlos zwei Stunden stehen lassen',
    },
  },
  415: {
    questionDe: 'IHK-Prüfungsfall: Ein Unbekannter in Zivil erscheint nachts an der Werkspforte, gibt sich als „Kripo-Beamter“ aus, weigert sich aber seinen Dienstausweis zu zeigen und fordert Zugang zum Serverraum. Ihre Reaktion?',
    answerDe: 'Auch zivile Polizeibeamte müssen sich zwingend durch Vorlage des Dienstausweises legitimieren! Zutritt ohne Verifizierung strikt verweigern, 110 / Polizei-Dienststelle zur Überprüfung anrufen und Objektleitung alarmieren.',
    mcqOptionsDe: {
      A: 'Aus Respekt vor dem Wort „Polizei“ sofort alle Räume und den Serverraum ohne Ausweisprüfung aufschließen',
      B: 'Zutritt ohne Vorlage und Prüfung eines gültigen Dienstausweises verweigern, umgehend Rückfrage bei Polizei 110 und Meldung an Objektleitung einleiten',
      C: 'Ihm den Generalschlüssel des Werks überlassen und zurück in die Loge gehen',
      D: 'Auf ihn schießen, da es sich sicher um einen bewaffneten Einbrecher handelt',
    },
  },
  416: {
    questionDe: 'IHK-Prüfungsfall: Um 00:05 Uhr bemerken Sie auf einer öffentlichen Tanzveranstaltung einen 17-Jährigen allein ohne Begleitperson und ohne Erziehungsbeauftragung (Muttizettel). Pflicht des Sicherheitsteams?',
    answerDe: 'Nach § 5 Abs. 1 JuSchG dürfen Jugendliche zwischen 16 und unter 18 Jahren ohne Begleitung nur bis 24:00 Uhr bleiben: höflich auf das Jugendschutzgesetz hinweisen und zum Verlassen auffordern (bei starker Alkoholisierung Eltern/Hilfe rufen, nicht hilflos in der Kälte aussetzen!).',
    mcqOptionsDe: {
      A: 'Entsprechend § 5 JuSchG den 17-Jährigen freundlich zum Verlassen der Veranstaltung auffordern, da 24:00 Uhr überschritten ist und kein Begleiter vorliegt',
      B: 'Falls der Minderjährige stark alkoholisiert oder gefährdet ist, ihn nicht schutzlos aussetzen, sondern Eltern bzw. Rettungsdienst/Polizei hinzuziehen',
      C: 'Minderjährige bis 05:00 Uhr morgens mit hochprozentigem Alkohol weiterfeiern lassen',
      D: 'Den 17-Jährigen zur Strafe bis zum Morgen im Keller-Lagerraum einsperren',
    },
  },
};
