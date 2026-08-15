// AUTO-GENERADO desde design-tokens/tokens.json — NO editar a mano. Correr `npm run tokens`.
import 'package:flutter/material.dart';

/// Paleta de marca de Empujón. Espejo de design-tokens/tokens.json.
class EmpujonColors {
  static const Color orange = Color(0xFFF79045);
  static const Color blue = Color(0xFF45ACF7);
  static const Color magenta = Color(0xFFEA45F7);
  static const Color green = Color(0xFF53F745);
  static const Color yellow = Color(0xFFFDF52A);
  static const Color red = Color(0xFFF74553);
  static const Color black = Color(0xFF171D17);
  static const Color white = Color(0xFFE3F2E3);
  static const Color whitesmoke = Color(0xFFF4F5F5);
  static const Color darkerGray = Color(0xFF252924);
  static const Color gray700 = Color(0xFF3B453C);
  static const Color gray600 = Color(0xFF4D584F);
  static const Color divider = Color(0xFF6B796B);
  static const Color lgray = Color(0xFFD1D6D1);
  static const Color lightgray = Color(0xFFE4E7E4);
  static const Color cuerpo = Color(0xFF171D17);
  static const Color superficie = Color(0xFF252924);
  static const Color lecturaFondo = Color(0xFFF4F5F5);
  static const Color primario = Color(0xFFF4F5F5);
  static const Color secundario = Color(0xFFE4E7E4);
  static const Color lectura = Color(0xFF171D17);
  static const Color deshabilitado = Color(0xFF6B796B);
  static const Color resaltado = Color(0xFFF79045);
  static const Color exito = Color(0xFF53F745);
  static const Color atencion = Color(0xFFFDF52A);
  static const Color informacion = Color(0xFF45ACF7);
  static const Color error = Color(0xFFF74553);
}

/// Radios de marca (px lógicos).
class EmpujonRadius {
  static const double pill = 100;
  static const double card = 24;
  static const double cardSm = 16;
  static const double chico = 8;
}

/// Sombras de marca. Todas drop-shadow con blur 40 — ver tokens.json > shadow.
class EmpujonShadows {
  static const List<BoxShadow> primaria = [
    BoxShadow(color: Color(0x80000000), blurRadius: 40, spreadRadius: 0),
  ];
  static const List<BoxShadow> naranja = [
    BoxShadow(color: Color(0x33F79045), blurRadius: 40, spreadRadius: 0),
  ];
  static const List<BoxShadow> verde = [
    BoxShadow(color: Color(0x3353F745), blurRadius: 40, spreadRadius: 0),
  ];
  static const List<BoxShadow> amarillo = [
    BoxShadow(color: Color(0x33FDF52A), blurRadius: 40, spreadRadius: 0),
  ];
  static const List<BoxShadow> celeste = [
    BoxShadow(color: Color(0x3345ACF7), blurRadius: 40, spreadRadius: 0),
  ];
  static const List<BoxShadow> magenta = [
    BoxShadow(color: Color(0x33EA45F7), blurRadius: 40, spreadRadius: 0),
  ];
}

/// Estilos de texto de marca (tamaño + interlineado + tracking + peso + familia),
/// espejo 1:1 de tokens.json > font.size. Usar directo o vía .copyWith(color: ...).
class EmpujonTextStyles {
  static const TextStyle h1 = TextStyle(
    fontSize: 40,
    height: 1.2,
    letterSpacing: 1,
    fontWeight: FontWeight.w600,
    fontFamily: 'Shantell Sans',
  );
  static const TextStyle h2 = TextStyle(
    fontSize: 24,
    height: 1.3,
    letterSpacing: 1,
    fontWeight: FontWeight.w600,
    fontFamily: 'Shantell Sans',
  );
  static const TextStyle h3 = TextStyle(
    fontSize: 20,
    height: 1.4,
    letterSpacing: 1,
    fontWeight: FontWeight.w600,
    fontFamily: 'Shantell Sans',
  );
  static const TextStyle labelGrande = TextStyle(
    fontSize: 24,
    height: 1.3,
    letterSpacing: 1,
    fontWeight: FontWeight.w600,
    fontFamily: 'Inter',
  );
  static const TextStyle labelMedio = TextStyle(
    fontSize: 20,
    height: 1.3,
    letterSpacing: 0,
    fontWeight: FontWeight.w600,
    fontFamily: 'Inter',
  );
  static const TextStyle labelChico = TextStyle(
    fontSize: 16,
    height: 1.5,
    letterSpacing: 1,
    fontWeight: FontWeight.w600,
    fontFamily: 'Inter',
  );
  static const TextStyle labelMini = TextStyle(
    fontSize: 14,
    height: 1.5,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
  static const TextStyle subtitulo = TextStyle(
    fontSize: 20,
    height: 1.4,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
  static const TextStyle textoGrande = TextStyle(
    fontSize: 20,
    height: 1.5,
    letterSpacing: 0,
    fontWeight: FontWeight.w400,
    fontFamily: 'Inter',
  );
  static const TextStyle textoMedio = TextStyle(
    fontSize: 18,
    height: 1.5,
    letterSpacing: 0,
    fontWeight: FontWeight.w400,
    fontFamily: 'Inter',
  );
  static const TextStyle textoChico = TextStyle(
    fontSize: 14,
    height: 1.4,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
  static const TextStyle enlaceGrande = TextStyle(
    fontSize: 20,
    height: 1.4,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
  static const TextStyle enlaceMedio = TextStyle(
    fontSize: 18,
    height: 1.4,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
  static const TextStyle enlaceChico = TextStyle(
    fontSize: 14,
    height: 1.3,
    letterSpacing: 0,
    fontWeight: FontWeight.w500,
    fontFamily: 'Inter',
  );
}

/// ThemeData base. Dark por default (fondo negro de marca).
ThemeData empujonTheme() {
  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: EmpujonColors.black,
    colorScheme: const ColorScheme.dark(
      primary: EmpujonColors.orange,
      secondary: EmpujonColors.blue,
      error: EmpujonColors.red,
      surface: EmpujonColors.darkerGray,
    ),
    fontFamily: 'Inter',
    textTheme: TextTheme(
      displayLarge: EmpujonTextStyles.h1,
      headlineMedium: EmpujonTextStyles.h2,
      headlineSmall: EmpujonTextStyles.h3,
      titleMedium: EmpujonTextStyles.subtitulo,
      bodyLarge: EmpujonTextStyles.textoGrande,
      bodyMedium: EmpujonTextStyles.textoMedio,
      bodySmall: EmpujonTextStyles.textoChico,
      labelLarge: EmpujonTextStyles.labelGrande,
      labelMedium: EmpujonTextStyles.labelMedio,
      labelSmall: EmpujonTextStyles.labelChico,
    ),
  );
}
