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
  static const Color gray-700 = Color(0xFF3B453C);
  static const Color gray-600 = Color(0xFF4D584F);
  static const Color divider = Color(0xFF6B796B);
  static const Color lgray = Color(0xFFD1D6D1);
  static const Color lightgray = Color(0xFFE4E7E4);
}

/// Radios de marca (px lógicos).
class EmpujonRadius {
  static const double pill = 100;
  static const double card = 24;
  static const double cardSm = 16;
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
  );
}
